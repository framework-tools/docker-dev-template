FROM node:14-alpine

WORKDIR /gsm

COPY . .

RUN npm i

EXPOSE 80 443

CMD ["npm", "start"]