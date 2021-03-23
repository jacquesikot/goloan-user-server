FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV NODE_ENV="production"

EXPOSE 3000

CMD [ "npm", "start" ]