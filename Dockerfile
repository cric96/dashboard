FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN chown -R node:node ./node_modules

COPY . ./

EXPOSE 8080

CMD ["npm", "run", "serve"]
