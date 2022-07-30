FROM node:16

WORKDIR /tweet-api

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY index.js .

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
