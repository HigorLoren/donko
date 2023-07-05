FROM node:16.13-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock /app/
RUN yarn install --silent

COPY . .

CMD ["yarn", "start"]
