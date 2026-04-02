# syntax=docker/dockerfile:1

FROM node:22-bullseye AS builder
WORKDIR /app

# Build args pour les variables NEXT_PUBLIC_* (nécessaires au build)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ARG APP_BASE_URL

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL
ENV APP_BASE_URL=$APP_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SKIP_TYPE_CHECK=true 

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:22-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

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
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]