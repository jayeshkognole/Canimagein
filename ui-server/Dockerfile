FROM node:16-alpine

WORKDIR /ui-server

COPY package*.json ./

RUN npm install --force --production

COPY build ./build

COPY Server.js .

EXPOSE 3000

CMD ["node", "Server.js"]