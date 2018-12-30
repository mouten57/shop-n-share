const express = require('express');
const mainConfig = require('./config/main-config');
const routeConfig = require('./config/route-config.js');
const http = require('http');
const axios = require('axios');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//main setup
mainConfig.init(app, express);

//route setup
routeConfig.init(app);

//express to behave in production
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  //Express will serve up index.html file if it doesn't
  //recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', client => {
  client.on('subscribeToItems', interval => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(async () => {
      let res = await axios.get('http://localhost:5000/api/items');
      client.emit('items', res.data);
    }, interval);
  });
});

server.listen(PORT);
