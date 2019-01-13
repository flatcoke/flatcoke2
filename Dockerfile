FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat yarn
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /opt/app
COPY . /opt/app

RUN yarn && yarn build

CMD [ "yarn", "start" ]
