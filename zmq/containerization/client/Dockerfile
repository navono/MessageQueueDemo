FROM node
COPY ./app /app
WORKDIR /app

RUN rm -rf node_modules && \
    apt-get update -qq && \
    apt-get install -y -qq python2.7 libzmq-dev && \
    npm install --silent

ENTRYPOINT [ "node", "/app/pull.js"]