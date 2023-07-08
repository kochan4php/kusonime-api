FROM node:lts-slim

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

EXPOSE 8000

ENTRYPOINT [ "pnpm", "run" ]

CMD [ "start" ]