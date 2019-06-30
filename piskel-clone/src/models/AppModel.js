import Configuration from '../Configuration';

export default class AppModel {
  constructor() {
    this.config = new Configuration();
  }

  setProperty(keyExp, val) {
    this.config.settings[keyExp] = val;
    this.saveDataSession();
  }

  setPropertyUser(keyExp, val) {
    this.config.user[keyExp] = val;
  }

  saveFrames(val) {
    this.config.frames = val;
    global.console.log(this.config);
    this.saveDataSession();
  }

  saveDataSession() {
    const cfg = this.config;
    const someData = [];
    someData.push(cfg.settings);
    someData.push(cfg.frames);
    someData.push(cfg.user);
    localStorage.setItem('session', JSON.stringify(someData));
  }

  getSessionData() {
    if (localStorage.getItem('session')) {
      // eslint-disable-next-line no-unused-vars
      const cfg = this.config.settings;
      // eslint-disable-next-line no-unused-vars
      const getData = JSON.parse(localStorage.getItem('session'));
      const [settings, frames, user] = getData;
      this.config.settings = settings;
      this.config.frames = frames;
      this.config.user = user;
    }
  }
}
