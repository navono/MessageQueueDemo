const amqp = require('amqplib/callback_api');

let amqpConn = null;

function start() {
  amqp.connect('amqp://user:password@45.32.69.18/', (err, conn) => {
    if (err != null) {
      console.log(err);
    }

    conn.on('error', err => {
      if (err.message !== 'Connection closeing') {
        console.error(`[AMQP] conn error: ${error.message}`);
      }
    });

    conn.on('close', () => {
      console.error('[AMQP] reconnecting.');
      return setTimeout(start, 1000);
    });

    console.log('[AMQP] connected.');
    amqpConn = conn;
    whenConnected();
  });
}

function whenConnected() {
  startPublisher();
  startConsumer();
}

let pubChannel = null;
let offlinePubQueue = [];

function startPublisher() {
  amqpConn.createChannel((err, chan) => {
    if (closeOnErr(err)) return;

    chan.on('error', err => {
      console.error(`[AMQP] channel error: ${err.message}`);
    });

    chan.on('close', () => {
      console.log('[AMQP] channel closed.');
    });

    pubChannel = chan;
    while (true) {
      const m = offlinePubQueue.shift();
      if (!m) break;

      publish(m[0], m[1], m[2]);
    }
  });
}

function publish(exchange, routingKey, content) {
  try {
    pubChannel.publish(exchange, routingKey, content, { persistent: false },
    (err, ok) => {
      if (err) {
        console.error("[AMQP] publish", err);
        offlinePubQueue.push([exchange, routingKey, content]);
        pubChannel.connection.close();
      }
    });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
}

function startConsumer() {
  amqpConn.createChannel((err, chan) => {
    if (closeOnErr(err)) return;
    
    chan.on('error', err => {
      console.error("[AMQP] channel error", err.message);
    });

    chan.on('close', () => {
      console.log("[AMQP] channel closed");
    });

    chan.prefetch(10);
    chan.assertQueue('jobs', { durable: false }, (err, ok) => {
      if (closeOnErr(err)) return;

      chan.consume('jobs', msg => {
        showMsg(msg, ack => {
          try {
            if (ack) {
              chan.ack(msg);
            } else {
              chan.reject(msg, true);
            }
          } catch (e) {
            closeOnErr(e);
          }
        });
      }, { noAck: false });
      console.log('Consumer is started.');
    });
  });
}

function showMsg(msg, cb) {
  console.log(`Receive message: ${msg.content.toString()}`);
  cb(true);
}

function closeOnErr(err) {
  if (!err) return false;

  console.error(`[AMQP] error: ${err}`);
  amqpConn.close();
  return true;
}

setInterval(() => {
  const time = new Date(Date.now());
  publish('', 'jobs', new Buffer(`something happened: ${time.toISOString()}!`))
}, 1000);

start();