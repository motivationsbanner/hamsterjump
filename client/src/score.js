define(["constants", "pixi", "textstyle"], function (constants, pixi, Textstyle) {
  // constructor
  function Score() {
    this.value = 0;
		this.style = new Textstyle();
		this.text = new PIXI.Text('Score: '+this.value, this.style);
  }
  
  Score.prototype.tick = function (ticks) {
		this.value = Math.floor(ticks/30);
		this.text.text = 'Score: '+this.value;
  };
  
  
  return Score;
});
  