import openSocket from 'socket.io-client';
const keys = require('./socketIOpath');
const socket = openSocket(keys.socketPath);
function subscribeToTimer(cb) {
  socket.on('items', items => {
    cb(null, items);
  });
  socket.emit('subscribeToItems', 1000);
}
export { subscribeToTimer };
