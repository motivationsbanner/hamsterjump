import textStyle from './textstyle';
import constants from './constants';
import { Text } from 'pixi.js';

export default class Score {
  constructor() {
    this.value = 0;
    this.style = textStyle;
    this.text = new Text('Score: ' + this.value, this.style);
  }

  tick(ticks) {
    this.value = Math.floor(ticks / 30);
    this.text.text = 'Score: ' + this.value;
  }
}
