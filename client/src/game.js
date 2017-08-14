import { Application, Text, loader, Sprite } from 'pixi.js';
import connection from './connection';
import constants from './constants';
import Player from './player';
import Obstacles from './obstacles';
import Score from './score';

var app,
  ticks = 0,
  player,
  obstacles,
  score,
  gamestate = 1,
  gameover = new Text('GAME OVER'),
  start = new Text('Click to start new game');

function init() {
  // init connection
  connection.init();

  // create and configure application
  app = new Application({
    width: constants.GAME_WIDTH,
    height: constants.GAME_HEIGHT,
    backgroundColor: 0x1099bb
  });

  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.stage.interactive = true;
  document.body.appendChild(app.view);
  app.stage.on("pointerdown", function () {
    gamestate = 2;
  });

  // load images
  loader
    .add([
      "images/hamster.png",
      "images/background.png",
      "images/box.png"
    ])
    .load(function () {

      var background = new Sprite(loader.resources["images/background.png"].texture);
      player = new Player();
      obstacles = new Obstacles(app);
      score = new Score();
      start.x = 320;
      start.y = 350;
      app.stage.addChild(start);
      app.stage.addChild(background);
      app.stage.addChild(player.sprite);
      app.stage.addChild(score.text);


      gameLoop();
    });
}

function gameLoop() {
  // loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  if (gamestate == 0) {

    ticks += 1;

    player.tick(ticks);
    obstacles.tick(ticks);
    score.tick(ticks);

    if (obstacles.collide(player.sprite)) {
      console.log("collision");
      gamestate = 1;
      gameover.x = 320;
      gameover.y = 350;
      app.stage.addChild(gameover);
      app.stage.removeAllListeners("pointerdown", function () {
        player.jump();
      });
      app.stage.on("pointerdown", function () {
        gamestate = 2;
      });
    }

    // render the stage
    app.renderer.render(app.stage);
  }
  else if (gamestate == 1) {
    //game over or menu
    app.renderer.render(app.stage);
  } else if (gamestate == 2) {
    //restarting
    app.stage.removeChild(gameover);
    ticks = 0;
    gamestate = 0;
    obstacles.remove(app);
    app.stage.removeAllListeners("pointerdown", function () {
      gamestate = 2;
    });
    app.stage.on("pointerdown", function () {
      player.jump();
    });

  }
}

export default {
  init: init
};
