import { Sprite, Texture } from 'pixi.js';
import constants from './constants';
import hitTest from './hitTest';

export default class Obstacles {
  constructor(app) {
    this.app = app;
    this.boxes = [];
  }

  tick(ticks) {
    if (ticks % constants.OBSTACLE_INTERVAL == 0) {
      // spawn new box
      let box = new Sprite(Texture.fromFrame("box.png"));

      box.x = constants.GAME_WIDTH;
      box.y = constants.GROUND_LEVEL - constants.OBSTACLE_HEIGHT;

      this.app.stage.addChild(box);

      // add the box to the array
      this.boxes.push(box);
    }

    // move boxes
    this.boxes.forEach(box => box.x -= 2);

    // remove old boxes
    while (this.boxes.length > 0 && this.boxes[0].x <= - constants.OBSTACLE_WIDTH) {
      this.boxes.splice(0, 1);
    }
  }

  collide(sprite) {
    return this.boxes.some(function (box) {
      return hitTest.rectangle(box, sprite);
    });
  }

  remove(app) {
    //remove boxes
    this.boxes.forEach(box => app.stage.removeChild(box));
    this.boxes = [];
  }
}
