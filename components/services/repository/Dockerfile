FROM node:8.9.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install
RUN npm install pino-elasticsearch

COPY . /usr/src/app

RUN chmod +x ./run-with-logging.sh

CMD ./run-with-logging.sh
