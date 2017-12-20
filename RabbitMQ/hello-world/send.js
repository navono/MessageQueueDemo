const amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@45.32.69.18/', (err, conn) => {
  if (err != null) {
    console.log(err);
  }

  conn.createChannel((err, chan) => {
    const queue = 'hello';
    const msg = 'Hello, World';

    chan.assertQueue(queue, {durable: false});
    chan.sendToQueue(queue, new Buffer(msg));
    console.log(` [x] Send '${msg}'`);
  });

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});