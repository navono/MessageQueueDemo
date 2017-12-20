FROM node
COPY ./app /app

EXPOSE 3000
WORKDIR /app

RUN rm -rf node_modules && \
    apt-get update -qq && \
    apt-get install -y -qq python2.7 libzmq-dev && \
    npm install --silent

ENTRYPOINT [ "node", "/app/push.js"]