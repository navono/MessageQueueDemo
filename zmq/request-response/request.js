const socket = require('zmq').socket('req');

socket.connect(`tcp://127.0.0.1:3000`);

let counter = 0;
socket.on('message', msg => {
  console.log(`Response received: ${msg}`);
  setTimeout(sendMessage, 2000);
});

function sendMessage() {
  const msg = `MSG #${counter++}`;
  console.log(`Sending ${msg}`);
  socket.send(msg);
}

sendMessage();