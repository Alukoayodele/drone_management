FROM node:18-alpine3.16 as builder

WORKDIR /usr/src/app

COPY ["tsconfig.json", "package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine3.16

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./

USER node

CMD ["node", "-r", "module-alias/register", "dist/src/server.js"]