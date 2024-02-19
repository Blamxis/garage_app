FROM node:18.19.1-alpine3.18
WORKDIR /opt/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8888
CMD [ "npm", "run", "start"]