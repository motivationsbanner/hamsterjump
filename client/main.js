require.config({
  paths: {
    pixi: "lib/pixi",
    socketio: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io",
    connection: "src/connection",
    someonenamethispls: "src/someonenamethispls"
  }
});

require(["someonenamethispls"], function(someonenamethispls) {
  someonenamethispls.init();
})
