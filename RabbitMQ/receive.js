const amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:pqx890917@45.32.69.18/', (err, conn) => {
  conn.createChannel((err, chan) => {
    const queue = 'hello';

    chan.assertQueue(queue, {durable: false});
    console.log(` [*] Waiting for messages in '${queue}'. To exit press CTRL+C`);
    chan.consume(queue, msg => {
      console.log(` [x] Received ${msg.content.toString()}`);
    }, {noAck: true});
  });
});