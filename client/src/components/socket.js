import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');
function subscribeToTimer(cb) {
  socket.on('items', items => {
    cb(null, items);
  });
  socket.emit('subscribeToItems', 1000);
}
export { subscribeToTimer };
