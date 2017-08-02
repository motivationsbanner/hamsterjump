"use strict";

const fs = require("fs"),
    EventEmitter = require("events").EventEmitter,
    startServer = new EventEmitter();

const http = require("http"),
    express = require("express");

const app = express();
app.use(express.static(__dirname + "/../client/"));
const server = http.createServer(app);

const io = require("socket.io").listen(server);
const port = 8000;

server.listen(port, function() {
    console.log("listening on *: " + port);
});

io.sockets.on("connection", function(client) {
    // do socket.io stuff
});