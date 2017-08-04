define(["constants", "pixi"], function (constants, pixi) {
  // constructor
  function Player() {
    this.texture = pixi.utils.TextureCache["images/hamster.png"];
    getRectangle(constants.PLAYER_HEIGHT, constants.PLAYER_WIDTH, 0, 6, this.texture);
    this.sprite = new pixi.Sprite(this.texture);

    this.isJumping = false;
    this.jumpcounter = 0;

    // center the sprite's anchor point
    this.sprite.x = 0;
    this.sprite.y = constants.GROUND_LEVEL - constants.PLAYER_HEIGHT;
  }

  Player.prototype.tick = function (ticks) {
    getRectangle(constants.PLAYER_HEIGHT, constants.PLAYER_WIDTH, ticks % 6, 6, this.texture);
    if (this.sprite.y < constants.GROUND_LEVEL - constants.PLAYER_HEIGHT && !this.isJumping) {
      this.sprite.y = this.sprite.y + 2;
    }
    if (this.isJumping) {
      this.jumpcounter = this.jumpcounter + 1;
      this.sprite.y = this.sprite.y - 2;
    }
    if (this.jumpcounter > constants.JUMP_MAX) {
      this.isJumping = false;
      this.jumpcounter = 0;
    }
  };

  Player.prototype.jump = function () {
    if (this.sprite.y == constants.GROUND_LEVEL - constants.PLAYER_HEIGHT && !this.isJumping) {
      this.isJumping = true;
    }
  };

  // update the player animation (?)
  function getRectangle(height, length, frame, maxframes, texture) {
    var framelength = length / maxframes;
    var rectangle = new pixi.Rectangle(framelength * frame, 0, framelength, height);
    texture.frame = rectangle;
  }

  return Player;
});
