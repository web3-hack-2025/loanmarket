FROM node:20-alpine

RUN corepack enable
WORKDIR /app
COPY ./bank-tm/package.json ./bank-tm/pnpm-lock.yaml ./
RUN pnpm i
COPY ./bank-tm .
ENTRYPOINT ["pnpm", "run", "dev"]
