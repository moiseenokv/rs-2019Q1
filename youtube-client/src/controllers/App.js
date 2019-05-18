import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.view = '';
    this.query = '';
    this.renderData = '';
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/',
      key: 'AIzaSyBaLSU8QondHsteJQpRo7mGoViGDzCHcXo',
      methods: {
        searchMethod: 'search',
        searchAdd: 'type=video&part=snippet&maxResults=15',
        videoMethod: 'videos',
        videoAdd: 'part=snippet,statistics',
      },
    };
  }

  init() {
    this.view = new AppView(this.renderData);
    this.searchListner(this.view);
    this.view.init();
  }

  searchListner(appView) {
    appView.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.query = appView.searchField.value;
      this.search();
    });
  }

  async search() {
    const model = new AppModel(this.state, this.query);
    const data = await model.getClipData();
    this.view.rndrData = await data;
    this.view.carouselView();
    this.view.render();

    // eslint-disable-next-line no-console
    // console.log(await data);
  }
}
