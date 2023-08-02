FROM node:lts-alpine AS base

# Install dependencies
FROM base as builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --prod

# Production image
FROM base as prod
WORKDIR /usr/src/app
RUN npm i pm2 -g
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 8000
ENTRYPOINT [ "pm2-runtime" ]
CMD [ "src/index.js" ]