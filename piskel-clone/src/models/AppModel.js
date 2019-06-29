import Configuration from '../Configuration';

export default class AppModel {
  constructor() {
    this.data = new Configuration();
  }

  setProperty(key, val) {
    this.data.current[key] = val;
  }
}
