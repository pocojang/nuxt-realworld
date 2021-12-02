FROM node:14 as builder

WORKDIR /app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build
RUN yarn generate

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app  .

ENV NUXT_PORT 80
EXPOSE 80

CMD [ "yarn", "start" ]
