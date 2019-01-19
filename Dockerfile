FROM node:alpine

RUN mkdir -p /www/client
RUN apk add --no-cache libc6-compat yarn
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /www/client
COPY . /www/client

RUN yarn && yarn build

CMD [ "yarn", "start" ]
