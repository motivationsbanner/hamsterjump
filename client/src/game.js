define(["pixi", "connection", "constants", "player", "obstacles"],
  function (pixi, connection, constants, Player, Obstacles) {
    var app,
      ticks = 0,
      player,
      obstacles;

    function init() {
      // init connection
      connection.init();

      // create and configure application
      app = new pixi.Application(constants.GAME_WIDTH, constants.game_HEIGHT, { backgroundColor: 0x1099bb });
      app.renderer.view.style.position = "absolute";
      app.renderer.view.style.display = "block";
      app.stage.interactive = true;
      document.body.appendChild(app.view);

      // load images
      pixi.loader
        .add([
          "images/hamster.png",
          "images/background.png",
          "images/box.png"
        ])
        .load(function () {

          var background = new pixi.Sprite(pixi.utils.TextureCache["images/background.png"]);
          player = new Player();
          obstacles = new Obstacles(app);

          app.stage.addChild(background);
          app.stage.addChild(player.sprite);

          app.stage.on("pointerdown", function () {
            player.jump();
          });

          gameLoop();
        });
    }

    function gameLoop() {

      // loop this function 60 times per second
      requestAnimationFrame(gameLoop);

      ticks += 1;

      player.tick(ticks);
      obstacles.tick(ticks);

      if (obstacles.collide(player.sprite)) {
        console.log("collision");
      }

      // render the stage
      app.renderer.render(app.stage);
    }

    return {
      init: init
    };
  });
