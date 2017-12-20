const amqp = require('amqplib/callback_api');


amqp.connect('amqp://admin:Pqx123@123@45.32.69.18:5672/', (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = 'topic_logs';
    const args = process.argv.slice(2);
    const key = (args.length > 0) ? args[0] : 'anonymous info';
    const msg = args.slice(1).join(' ') || 'Hello world.';

    ch.assertExchange(ex, 'topic', {durable: false});
    ch.publish(ex, key, new Buffer(msg));
    console.log(` [x] Sent ${key}: ${msg}`);
  });

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});