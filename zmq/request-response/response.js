const socket = require('zmq').socket('rep');

socket.bindSync(`tcp://127.0.0.1:3000`);

socket.on('message', msg => {
  console.log(`Received ${msg}. Responding...`);
  socket.send(`Responding to ${msg}`);
});

console.log('Response listening on 3000');
