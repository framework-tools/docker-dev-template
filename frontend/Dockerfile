FROM node:14-alpine

RUN apk add git
RUN git clone https://github.com/framework-tools/svelte.git /svelte && \
    cd /svelte && \
    npm i && \
    npm run build && \
    npm link

WORKDIR /gsm

RUN npm i -g nodemon
RUN npm i -g rollup

COPY . .

RUN npm i
RUN npm link svelte
RUN sh ./install

EXPOSE 80 443 33440

CMD sh ./start