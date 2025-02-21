FROM node:14

WORKDIR /app

ARG SERVICE
COPY ./$SERVICE/package.json .

RUN npm install

RUN npm install supervisor -g

COPY . .

CMD ["node", "app.js"]
