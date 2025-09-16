FROM oven/bun:1.2 as base
WORKDIR /app

COPY package.json bun.lockb* tsconfig.json bunfig.toml ./
RUN bun install

COPY src ./src

ENV PORT=3000
EXPOSE 3000

CMD ["bun", "run", "src/main.ts"]
