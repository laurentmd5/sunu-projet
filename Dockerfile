# syntax=docker/dockerfile:1

FROM node:20-bullseye AS builder
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies needed for build
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy application sources and build
COPY . .
RUN npm run build

# Prune devDependencies after build to keep the final image smaller
RUN npm prune --production

FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only the built app and production dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/app ./app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/type.ts ./type.ts

EXPOSE 3000
CMD ["npm", "start"]
