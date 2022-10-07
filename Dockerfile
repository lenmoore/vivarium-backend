FROM node:18.2.0
#https://medium.com/@kartikio/setup-node-ts-local-development-environment-with-docker-and-hot-reloading-922db9016119 do this
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install && npm cache clean --force

COPY tsconfig.json ./

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
CMD [ "npm", "run", "start"]
