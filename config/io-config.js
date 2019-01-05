const axios = require('axios');
const keys = require('./keys/keys');

module.exports = {
  init(io) {
    io.on('connection', client => {
      client.on('getItems', async () => {
        console.log('client is grabbing items');
        let res = await axios.get(keys.ioGetPath);
        io.emit('updateItems', res.data);
      });
    });
  }
};
