import textStyle from './textstyle';
import constants from './constants';
import { Text } from 'pixi.js';

// constructor
function Score() {
  this.value = 0;
  this.style = textStyle;
  this.text = new Text('Score: ' + this.value, this.style);
}

Score.prototype.tick = function (ticks) {
  this.value = Math.floor(ticks / 30);
  this.text.text = 'Score: ' + this.value;
};

export default Score;
