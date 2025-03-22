import "dotenv/config";
import Fastify from "fastify";
import z from "zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createSign, publicEncrypt } from "crypto";
import { db } from "./db";
import { blobsTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { bundleRequest, errorResponse, loanRequest, loansRequest } from "./lib";

if (!process.env.PROVIDERS) {
  throw new Error(
    "Could not get providers list, please set PROVIDERS in env vars",
  );
}

if (!process.env.ANCHOR) {
  throw new Error("Could not get trust anchor, please set ANCHOR in env vars");
}

if (!process.env.KEY_PAIR) {
  throw new Error("Could not get key pair, please set KEY_PAIR in env vars");
}

const keyPair = atob(process.env.KEY_PAIR!);
const providers = process.env.PROVIDERS!.split(",");
const anchor = process.env.ANCHOR!;

const validateCredentialsUrl = new URL(anchor);
validateCredentialsUrl.pathname = "/verify";

const app = Fastify({
  maxParamLength: 1000,
  logger: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SampleApi",
      description: "Sample backend service",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.after(() => {
  const zApp = app.withTypeProvider<ZodTypeProvider>();

  zApp.post(
    "/offers",
    {
      schema: {
        body: loansRequest,
        response: {
          200: z.object({
            offers: z.array(z.string()),
            credentialToken: z.string(),
          }),
          400: errorResponse("Credentials revoked"),
        },
      },
    },
    async (request, response) => {
      const loansRequest = request.body;

      console.log(validateCredentialsUrl);

      const verifyRequest = await fetch(validateCredentialsUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loansRequest),
      });

      if (!verifyRequest.ok) {
        response.status(verifyRequest.status).send(await verifyRequest.json());
        return;
      }

      const { token } = (await verifyRequest.json()) as { token: string };
      const { score } = JSON.parse(atob(token.split(".")[1])) as {
        score: number;
      };

      const offers = await Promise.all(
        (
          await Promise.allSettled(
            providers.map(async (provider) => {
              const url = new URL(provider);
              url.pathname = "/requestOffer";
              return await fetch(url, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  score,
                  ...loansRequest.loanDetails,
                } as z.infer<typeof loanRequest>),
              });
            }),
          )
        )
          .filter((res) => res.status === "fulfilled" && res.value.ok)
          .map(async (res) => {
            if (res.status !== "fulfilled") throw new Error("Unreachable");
            const { token } = (await res.value.json()) as { token: string };
            return token;
          }),
      );

      return {
        credentialToken: token,
        offers,
      };
    },
  );

  zApp.post(
    "/bundle",
    {
      schema: {
        body: bundleRequest,
        response: {
          200: z.object({
            blob: z.string(),
            signature: z.string(),
          }),
        },
      },
    },
    async (request) => {
      const { iss } = JSON.parse(
        atob(request.body.loanToken.split(".")[1]),
      ) as { iss: string };

      const requestUrl = new URL(iss);
      requestUrl.pathname = "/.well-known";
      const { certificate } = (await (await fetch(requestUrl)).json()) as {
        certificate: string;
      };

      const blobHash = publicEncrypt(
        certificate,
        JSON.stringify(request.body.credentials),
      );

      const sign = createSign("RSA-SHA256");
      sign.update(blobHash);
      const signed = sign.sign(keyPair);
      const signString = signed.toString("base64url");
      const entity = {
        blob: blobHash.toString("base64url"),
        signature: signString,
      };

      await db.insert(blobsTable).values(entity);

      return entity;
    },
  );

  zApp.get(
    "/bundle/:sig",
    {
      schema: {
        params: z.object({
          sig: z.string(),
        }),
        response: {
          200: z.object({ blob: z.string() }),
          404: errorResponse("Could not find blob"),
        },
      },
    },
    async (req, reply) => {
      const { sig } = req.params;
      const maybeBlob = await db
        .select()
        .from(blobsTable)
        .where(eq(blobsTable.signature, sig));

      if (maybeBlob.length != 1) {
        reply.status(404).send({ error: "Could not find blob" });
        return;
      }

      return {
        blob: maybeBlob[0].blob,
      };
    },
  );

  app.get("/", () => {
    return Promise.resolve({ ok: true });
  });
});

app.listen({
  port: 8080,
  host: "0.0.0.0",
});
