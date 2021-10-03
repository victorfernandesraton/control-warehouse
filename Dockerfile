FROM node:14-alpine

WORKDIR /usr/src/app
# node and npm version
RUN node --version
RUN npm --version

COPY ["package.json", "./"]

## isntall
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8000
