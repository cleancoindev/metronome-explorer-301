FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
  curl \
  gnupg

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/src/explorer
COPY package.json .
COPY package-lock.json .
RUN npm ci --production
COPY . .

CMD ["npm", "start"]

EXPOSE 3004