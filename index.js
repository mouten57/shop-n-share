const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mainConfig = require("./config/main-config");
const routeConfig = require("./config/route-config.js");
const axios = require("axios");
const PORT = process.env.PORT || 5000;

const io = require("socket.io")(server);
const ioConfig = require("./config/io-config");

//main setup
mainConfig.init(app, express, io, axios);

//route setup
routeConfig.init(app);

//socket.io setup
ioConfig.init(io);

//express to behave in production
if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  //Express will serve up index.html file if it doesn't
  //recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT);
