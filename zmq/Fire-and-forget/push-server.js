// Creat PUSH socket
const socket = require('zmq').socket(`push`);

socket.bindSync(`tcp://127.0.0.1:3000`);

let counter = 0;
setInterval(() => {
  const msg = `Ping #${counter++}`;
  console.log(`Sending ${msg}`);
  socket.send(msg);
}, 2000);