FROM node:18-alpine

ENV LANG=ru_RU

RUN apk add --no-cache tzdata 

ENV TZ=Europe/Moscow

WORKDIR /scrapper

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./dist/index.js"]