define(["pixi"], function (PIXI) {
  var counter = 0,
    jump = false,
    jumpcounter = 0,
    spawn = 240,
    boxes = [],
    jumpmax = 40,
    background,
    groundlevel,
    texture,
    hamster;

  var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  document.body.appendChild(app.view);
  app.stage.interactive = true;
  app.stage.on('pointerdown', onClick);

  function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {

        //There's definitely a collision happening
        hit = true;
      } else {

        //There's no collision on the y axis
        hit = false;
      }
    } else {

      //There's no collision on the x axis
      hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
  };

  function setup() {
    background = new PIXI.Sprite(PIXI.utils.TextureCache["images/background.png"]);
    texture = PIXI.utils.TextureCache["images/hamster.png"];
    getRectangle(115, 384, 0, 6, texture)
    hamster = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    groundlevel = 430;
    hamster.x = 0;
    hamster.y = groundlevel - 115;
    app.stage.addChild(background);
    app.stage.addChild(hamster);
    gameLoop();
  }

  function onClick() {
    if (hamster.y == groundlevel - 115 && !jump) {
      jump = true;
    }
  }
  function getRectangle(height, length, frame, maxframes, texture) {
    var framelength = length / maxframes;
    var rectangle = new PIXI.Rectangle(framelength * frame, 0, framelength, height);
    texture.frame = rectangle;
  }

  function gameLoop() {

    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);

    counter = counter + 1;
    getRectangle(115, 384, counter % 6, 6, texture)
    if (hamster.y < groundlevel - 115 && !jump) {
      hamster.y = hamster.y + 2;
    }
    if (jump) {
      jumpcounter = jumpcounter + 1;
      hamster.y = hamster.y - 2;
    }
    if (jumpcounter > jumpmax) {
      jump = false;
      jumpcounter = 0;
    }

    if (counter % spawn == 0) {
      //spawn new box
      boxes[boxes.length] = new PIXI.Sprite(PIXI.utils.TextureCache["images/box.png"]);
      boxes[boxes.length - 1].x = 800;
      boxes[boxes.length - 1].y = groundlevel - 20;
      app.stage.addChild(boxes[boxes.length - 1]);
    }
    //move boxes
    for (var i = 0; i < boxes.length; ++i) {
      boxes[i].x = boxes[i].x - 2;
      //remove old boxes
      if (boxes[i].x < -50) {
        boxes.splice(i, 1);
      }
      //test collision detection
      if (hitTestRectangle(hamster, boxes[i])) {
        // collided with box
      }
    }

    //Render the stage
    app.renderer.render(app.stage);
  }

  return {
    init: function () {
      PIXI.loader
        .add([
          "images/hamster.png",
          "images/background.png",
          "images/box.png"
        ])
        .load(setup);
    }
  }
});
