import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.view = new AppView();
    this.model = new AppModel();
    this.flag = '';
  }

  init() {
    this.view.data = this.model.data.object;
    this.view.init();
    this.view.render();
    this.view.tools.toolsListner(this.model);
    this.view.canvas.mainCanvasInit(this.model.data.current.drawCanvas);
    this.view.frames.framesListner(this.view.frames, this.view.canvas.ctx, this.view.canvas.canvas);
    this.view.tools.paletteModalListner();
  }
}
