import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.view = new AppView();
    this.model = new AppModel();
  }

  init() {
    this.view.render();
  }
}
