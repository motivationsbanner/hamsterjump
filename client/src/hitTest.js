define(function () {
  // return true when rectangles overlap
  function hitTestRectangle(r1, r2) {

    // define the variables we'll need to calculate
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    // hit will determine whether there's a collision
    hit = false;

    // find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    // find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    // calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    // figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    // check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

      // a collision might be occuring. check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {

        // there's definitely a collision happening
        hit = true;
      } else {

        // there's no collision on the y axis
        hit = false;
      }
    } else {

      // there's no collision on the x axis
      hit = false;
    }

    // `hit` will be either `true` or `false`
    return hit;
  }

  return {
    rectangle: hitTestRectangle
  };
});
