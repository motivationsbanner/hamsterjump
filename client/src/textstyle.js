define(["constants", "pixi"], function (constants, pixi) {
  // constructor
  function Textstyle() {
    this.style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
	});
  }

  return Textstyle;
});
  

