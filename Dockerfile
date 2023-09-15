FROM node:18.17.1-alpine3.18

WORKDIR /usr/local/src

COPY ./backend/package*.json .
COPY ./backend/src ./src

RUN apk add --no-cache bash
RUN npm install

EXPOSE 4200

CMD [ "npm", "start"]
