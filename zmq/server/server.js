// Creat PUSH socket
const socket = require('zmq').socket(`push`);

socket.bindSync(`tcp://127.0.0.1:3000`);

setInterval(() => {
  const msg = `Ping`;
  console.log(`Sending ${msg}`);
  socket.send(msg);
}, 2000);
