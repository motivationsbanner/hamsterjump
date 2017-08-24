import { extras, Rectangle, Texture } from 'pixi.js';
import constants from './constants';

export default class Player {
  constructor() {

    // create animatedSprite
    let frames = [];

    for (let i = 1; i <= 9; i++) {
      frames.push(PIXI.Texture.fromFrame(`hamster0${i}.png`));
    }

    this.sprite = new extras.AnimatedSprite(frames);
    this.sprite.scale.set(0.35);
    this.sprite.animationSpeed = 0.3;

    // initialize variables
    this.basePos = constants.GROUND_LEVEL - this.sprite.height + constants.PLAYER_SHIFT;
    this.sprite.y = this.basePos;
    this.isJumping = false;
    this.yspeed = 0;
    this.sprite.x = 0;

    // TODO: create hitbox
  }

  startRunning() {
    this.sprite.play();
  }

  die() {
    this.sprite.gotoAndStop(0);
  }

  tick(ticks) {
    if (this.isJumping) {
      this.sprite.y += this.yspeed;
      this.yspeed += constants.GRAVITY;

      if (this.sprite.y >= this.basePos) {
        this.isJumping = false;
        this.sprite.y = this.basePos;
      }
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.yspeed = constants.JUMP_SPEED;
    }
  }
}
