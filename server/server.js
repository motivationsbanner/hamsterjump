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

server.listen(port, function () {
  console.log("listening on *: " + port);
});

// get dbaccess instance
const dbAccess = require(__dirname + "/src/databaseAccess");
const constants = require(__dirname + "/src/constants")
// tests
var test = dbAccess.insertUser("123FF1-FFAsdasd", "somename");
dbAccess.insertScore("123FF1-FFAsdasd", 123); // should work
dbAccess.insertScore("123FF1-FFAsdasd1", 123); // should failt

dbAccess.getHighscore(constants.HIGHSCORE_AMOUNT, (highscore) => {
  // console.log(highscore);
  // do something with it:)
});

io.sockets.on("connection", client => {
  // do socket.io stuff
  
  client.on("authenticate", data => {
    var uniqueId = data.uniqueId;
    if (uniqueId) {
      // check if user already exists
      uniqueId = "124";
    } else {
      // create new uniqueId and insert user
      uniqueId = "123";
    }

    client.emit("authenticate", { uniqueId: uniqueId });
  });

});
