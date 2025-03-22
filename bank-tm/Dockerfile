FROM node:20-alpine

RUN corepack enable
WORKDIR /app
COPY ./backend/package.json ./backend/pnpm-lock.yaml ./
RUN pnpm i
COPY ./backend .
RUN chmod +x start.sh
CMD ["./src/index.ts"]
