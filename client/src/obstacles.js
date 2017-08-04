define(["constants", "pixi", "hitTest"], function (constants, pixi, hitTest) {
  // constructor
  function Obstacles(app) {
    this.app = app;
    this.boxes = [];
  }

  Obstacles.prototype.tick = function (ticks) {
    if (ticks % constants.OBSTACLE_INTERVAL == 0) {
      // spawn new box
      var box = new pixi.Sprite(pixi.utils.TextureCache["images/box.png"]);

      box.x = constants.GAME_WIDTH;
      box.y = constants.GROUND_LEVEL - constants.OBSTACLE_HEIGHT;

      this.app.stage.addChild(box);

      // add the box to the array
      this.boxes.push(box);
    }

    // move boxes
    this.boxes.forEach(function (box) {
      box.x -= 2;
    });

    // remove old boxes
    while (this.boxes.length > 0 && this.boxes[0].x <= - constants.OBSTACLE_WIDTH) {
      this.boxes.splice(0, 1);
    }
  };

  Obstacles.prototype.collide = function (sprite) {
    return this.boxes.some(function (box) {
      return hitTest.rectangle(box, sprite);
    });
  };
	
	Obstacles.prototype.remove = function (app) {
		//remove boxes
		this.boxes.forEach(function (box) {
			app.stage.removeChild(box);
    });
		this.boxes = [];
	};

  return Obstacles;
});
