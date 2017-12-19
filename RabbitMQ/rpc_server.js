const amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:Pqx123@123@45.32.69.18:5672/', (err, conn) => {
  conn.createChannel(function(err, ch) {
    const q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    ch.consume(q, function reply(msg) {
      const n = parseInt(msg.content.toString());

      console.log(" [.] fib(%d)", n);

      const r = fibonacci(n);

      ch.sendToQueue(msg.properties.replyTo,
        new Buffer(r.toString()),
        {correlationId: msg.properties.correlationId});

      ch.ack(msg);
    });
  });
});

function fibonacci(n) {
  return Math.round(
  (Math.pow((1 + Math.sqrt(5)) / 2, n) - 
   Math.pow(-2 / (1 + Math.sqrt(5)), n)) / Math.sqrt(5));
 }