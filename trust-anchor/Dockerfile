FROM node:20-alpine

RUN corepack enable
WORKDIR /app
COPY ./trust-anchor/package.json ./trust-anchor/pnpm-lock.yaml ./
RUN pnpm i
COPY ./trust-anchor .
COPY ./backend/src/lib.ts ./src
EXPOSE 8082
ENTRYPOINT ["pnpm", "run", "dev"]
