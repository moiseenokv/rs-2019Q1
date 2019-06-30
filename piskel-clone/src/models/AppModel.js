import Configuration from '../Configuration';

export default class AppModel {
  constructor() {
    this.config = new Configuration();
  }

  setProperty(keyExp, val) {
    this.config.settings[keyExp] = val;
  }

  setPropertyUser(keyExp, val) {
    this.config.user[keyExp] = val;
  }

  setPropertyFrame(keyExp, val) {
    this.config.frames[keyExp] = val;
  }
}
