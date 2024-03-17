# Builder
FROM node:12.14-alpine as builder
RUN apk update
WORKDIR /tmp
COPY . /tmp/
RUN yarn
RUN yarn build

# Runner
FROM node:12.14-alpine
# RUN apk update && apk add --no-cache --virtual builds-deps build-base python
WORKDIR /tmp
COPY --from=builder /tmp/dist /tmp/dist
COPY --from=builder /tmp/package.json /tmp/package.json
RUN yarn --production
EXPOSE 3000
CMD [ "yarn", "start:prod"]
