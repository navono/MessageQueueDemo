const socket = require('zmq').socket('pub');

socket.bindSync(`tcp://127.0.0.1:3000`);

const topic = `heartbeat`;

setInterval(() => {
  const timestamp = Date.now().toString();
  console.log(`Send ${timestamp} to topic: ${topic}`)
  socket.send([topic, timestamp]);
}, 2000);
