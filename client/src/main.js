require.config({
  baseUrl: "src",
  paths: {
    pixi: "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.4/pixi.min",
    socketio: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io"
  }
});

require(["game"], function (game) {
  // init game
  game.init();
});
