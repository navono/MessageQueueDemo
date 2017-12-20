// Creat PUSH socket
const socket = require('zmq').socket(`push`);
const address = process.env.ZMQ_BIND_ADDRESS || `tcp://*:3000`;

console.log(`Listening at ${address}`);
socket.bindSync(address);

setInterval(() => {
  const msg = `Ping`;
  console.log(`Sending ${msg}`);
  socket.send(msg);
}, 2000);
