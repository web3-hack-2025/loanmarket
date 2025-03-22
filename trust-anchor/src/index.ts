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
import { errorResponse, loansRequest } from "./lib";
import { importPKCS8, SignJWT } from "jose";

if (!process.env.CRT) {
  throw new Error("Could not get key pair, please set CRT in env vars");
}

if (!process.env.KEY) {
  throw new Error("Could not get key pair, please set KEY in env vars");
}

const jwtAlgo = "RS256";

const keyString = atob(process.env.KEY!);
let key: CryptoKey;
importPKCS8(keyString, jwtAlgo).then((newKey) => (key = newKey));
const crt = atob(process.env.CRT!);

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
    "/verify",
    {
      schema: {
        body: loansRequest,
        response: {
          400: errorResponse("Credentials revoked"),
          200: z.object({ token: z.string() }),
        },
      },
    },
    async (request, response) => {
      const isValuedRequest =
        Object.values(request.body.credentials).filter(
          ({ type }) => type === "credential",
        ).length > 2;

      if (!isValuedRequest) {
        await response.code(400).send({ error: "Credentials revoked" });
        return;
      }

      const token = await new SignJWT()
        .setProtectedHeader({
          alg: jwtAlgo,
          score: Math.round(Math.random() * 10),
        })
        .sign(key);

      return {
        token,
      };
    },
  );

  zApp.get(
    "/.well-known",
    { schema: { response: { 200: z.object({ certificate: z.string() }) } } },
    () => {
      return { certificate: crt };
    },
  );

  app.get("/", () => {
    return Promise.resolve({ ok: true });
  });
});

app.listen({
  port: 8081,
});
