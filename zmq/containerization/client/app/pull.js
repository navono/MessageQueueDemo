// Create PULL socket
const socket = require('zmq').socket(`pull`);
console.log(process.env.ZMQ_PUB_ADDRESS);
const address = process.env.ZMQ_PUB_ADDRESS || `tcp://127.0.0.1:3000`;

console.log(`Connecting to ${address}`);
socket.connect(address);

socket.on('message', msg => {
  console.log(`Message received: ${msg}`);
});