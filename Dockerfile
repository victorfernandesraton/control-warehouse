FROM node:14-alpine

WORKDIR /app
RUN node --version
RUN npm --version
COPY ["package.json", "./"]
RUN npm install
COPY . .

EXPOSE 8000
CMD ["npm", "start"]
