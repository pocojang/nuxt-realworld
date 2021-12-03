FROM node:14-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install --production


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app  .

ENV NODE_ENV production
ENV NUXT_PORT 80
ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "yarn", "start" ]
