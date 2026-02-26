FROM node:20-alpine

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json ./

RUN pnpm install

# Copy project files (overridden by volume mount in dev)
COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
