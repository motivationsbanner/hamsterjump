import { loader, Sprite, Rectangle } from 'pixi.js';
import constants from './constants';

export default class Player {
  constructor() {
    this.texture = loader.resources["images/hamster.png"].texture;
    this.getRectangle(constants.PLAYER_HEIGHT, constants.PLAYER_WIDTH, 0, 6, this.texture);
    this.sprite = new Sprite(this.texture);

    this.isJumping = false;
    this.jumpcounter = 0;

    // center the sprite's anchor point
    this.sprite.x = 0;
    this.sprite.y = constants.GROUND_LEVEL - constants.PLAYER_HEIGHT;
  }

  tick(ticks) {
    this.getRectangle(constants.PLAYER_HEIGHT, constants.PLAYER_WIDTH, ticks % 6, 6, this.texture);
    if (this.sprite.y < constants.GROUND_LEVEL - constants.PLAYER_HEIGHT && !this.isJumping) {
      this.sprite.y += 2;
    }
    if (this.isJumping) {
      this.jumpcounter += 1;
      this.sprite.y -=2;
    }
    if (this.jumpcounter > constants.JUMP_MAX) {
      this.isJumping = false;
      this.jumpcounter = 0;
    }
  }

  jump() {
    if (this.sprite.y == constants.GROUND_LEVEL - constants.PLAYER_HEIGHT && !this.isJumping) {
      this.isJumping = true;
    }
  }

  // update the player animation (?)
  getRectangle(height, length, frame, maxframes, texture) {
    let framelength = length / maxframes;
    let rectangle = new Rectangle(framelength * frame, 0, framelength, height);
    texture.frame = rectangle;
  }
}
