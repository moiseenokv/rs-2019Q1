import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.view = new AppView();
  }

  init() {
    this.view.initialView();
    this.view.render();
    this.view.fullScreen();
  }
}
