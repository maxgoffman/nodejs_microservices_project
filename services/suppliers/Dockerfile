FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install pm2 nodemon supervisor -g

COPY . .

#CMD ["node", "app.js"]
CMD [ "pm2-docker", "app.js" ]
