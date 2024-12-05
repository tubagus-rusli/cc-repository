FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV CLOUD_SQL_CONNECTION_NAME=budgy-money-tracker:asia-southeast2:money-tracker

EXPOSE 8080

CMD ["node", "server.js"]
