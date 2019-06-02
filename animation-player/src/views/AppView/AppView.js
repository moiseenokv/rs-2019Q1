const data = require('./config.json');

export default class AppView {
  constructor() {
    this.data = data;
    this.tools = document.querySelector('.tools');
    this.canvas = document.querySelector('.canvas');
    this.frames = document.querySelector('.frames');
    this.preview = document.querySelector('.preview');
  }

  initialView() {
    global.console.log(this.data);
  }
}
