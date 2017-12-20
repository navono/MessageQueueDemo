const amqp = require('amqplib/callback_api');

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log('Usage: rpc_client.js num');
  process.exit(1);
}

amqp.connect('amqp://admin:Pqx123@123@45.32.69.18:5672/', (err, conn) => {
  conn.createChannel((err, ch) => {
    ch.assertQueue('', {exclusive: true}, (err, q) => {
      const corrId = generateUUID();
      const num = parseInt(args[0]);

      console.log(` [x] Requesting fib(${num})`);

      ch.consume(q.queue, msg => {
        if (msg.properties.correlationId == corrId) {
          console.log(` [.] Got ${msg.content.toString()}`);
          setTimeout(() => {
            conn.close();
            process.exit(0);
          }, 500);
        }
      }, {noAck: true});

      ch.sendToQueue(
        'rpc_queue', 
        new Buffer(num.toString()), 
        {correlationId: corrId, replyTo: q.queue});
    });
  });
});

function generateUUID() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}