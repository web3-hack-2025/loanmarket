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
import { errorResponse, loansRequest } from "./lib";

if (!process.env.KEY_PAIR) {
  throw new Error("Could not get key pair, please set KEY_PAIR in env vars");
}

const keyPair = atob(process.env.KEY_PAIR!);

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
    "/bundle",
    {
      schema: {
        body: loansRequest,
        response: {
          400: errorResponse("Credentials revoked"),
          200: z.object({
            blob: z.string(),
            signature: z.string(),
          }),
        },
      },
    },
    async (request) => {
      // const { body, key } = request.body;
      // const blobString = JSON.stringify(body);
      // const blob = publicEncrypt(key, blobString).toString("base64");
      // const sign = createSign("RSA-SHA256");
      // sign.update(blob);
      // const signature = sign.sign(keyPair).toString("base64url");
      // await db.insert(blobsTable).values({
      //   signature,
      //   blob,
      // });
      // return {
      //   blob,
      //   signature,
      // };
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
});
