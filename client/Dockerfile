FROM node:20-alpine

ENV LANG=ru_RU

RUN apk add --no-cache tzdata 

ENV TZ=Europe/Moscow

WORKDIR /client

COPY ./package*.json ./

RUN npm install 

COPY . .

RUN npm run build

CMD [ "node", "./.output/server/index.mjs" ]