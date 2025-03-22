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
import { errorResponse, loanRequest, loansRequest } from "./lib";
import { importPKCS8, SignJWT } from "jose";

if (!process.env.CRT) {
  throw new Error("Could not get key pair, please set CRT in env vars");
}

if (!process.env.KEY) {
  throw new Error("Could not get key pair, please set KEY in env vars");
}

if (!process.env.URL) {
  throw new Error("Could not loan provider url, please set URL in env vars");
}

if (!process.env.NAME) {
  throw new Error("Could not loan provider name, please set NAME in env vars");
}

if (!process.env.IMAGE_B64) {
  throw new Error(
    "Could not get loan provider image, please set IMAGE_B64 in env vars",
  );
}

if (!process.env.IMAGE_CT) {
  throw new Error(
    "Could not get loan provider image content type, please set IMAGE_CT in env vars",
  );
}

if (!process.env.SCORE) {
  throw new Error("Could not get min score, please set SCORE in env vars");
}

if (!process.env.INTEREST_RATE) {
  throw new Error(
    "Could not get interest rate, please set INTEREST_RATE in env vars",
  );
}

const jwtAlgo = "RS256";

const keyString = atob(process.env.KEY!);
let key: CryptoKey;
importPKCS8(keyString, jwtAlgo).then((newKey) => (key = newKey));
const crt = atob(process.env.CRT!);
const url = process.env.URL!;
const name = process.env.NAME!;
const image = Buffer.from(process.env.IMAGE_B64!, "base64");
const imageContentType = process.env.IMAGE_CT!;
const minScore = parseInt(process.env.SCORE!);
const interestRate = parseInt(process.env.INTEREST_RATE!);

const app = Fastify({
  maxParamLength: 1000,
  logger: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "LoanProvider",
      description: "The mock api of a loan provider",
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
    "/requestOffer",
    {
      schema: {
        body: loanRequest,
        response: {
          400: errorResponse("Get Fucked lol"),
          200: z.object({ token: z.string() }),
        },
      },
    },
    async (request, response) => {
      const { score, amountRequested } = request.body;

      if (score < minScore) {
        await response.status(400).send({ error: "Get Fucked lol" });
        return;
      }

      const payout = ((score - minScore) / (10 - minScore)) * amountRequested;
      const offerInterestRate =
        ((score - minScore) / (2 * minScore - 20) + 1.5) * interestRate;

      const token = await new SignJWT({
        payout,
        offerInterestRate,
      })
        .setProtectedHeader({
          alg: jwtAlgo,
        })
        .setIssuer(url)
        .sign(key);

      return {
        token,
      };
    },
  );

  zApp.get("/logo", (_, res) =>
    res.status(200).header("content-type", imageContentType).send(image),
  );

  zApp.get(
    "/details",
    {
      schema: { response: { 200: z.object({ name: z.string() }) } },
    },
    () => ({ name }),
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
