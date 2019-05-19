import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.view = '';
    this.query = '';
    this.renderData = '';
    this.lastQuery = '';
    this.someConst = 1;
    this.nextSearch = '';
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/',
      key: 'AIzaSyAkWCHEovWOBA7SYl4wDKREyPF4QLWGwEU',
      next: '',
      lastQuery: '',
      methods: {
        searchMethod: 'search',
        searchAdd: 'type=video&part=snippet&maxResults=15',
        searchNext: 'pageToken=',
        videoMethod: 'videos',
        videoAdd: 'part=snippet,statistics',
      },
    };
    this.model = new AppModel();
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

  searchNextListner(appView) {
    setTimeout(() => {
      appView.currPage.addEventListener('click', (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log('hello');
        const currPage = parseInt(appView.currPage.innerText, 10);
        const lastPage = parseInt(appView.lastPage.innerText, 10);
        if ((lastPage - currPage) === 1) {
          this.searchNext();
          this.someConst = 0;
        // eslint-disable-next-line no-empty
        } else {
          this.someConst = 1;
        }
      });
    }, 200);
  }

  async search() {
    const model = new AppModel(this.state, this.query);
    const data = await model.getClipData();
    this.state.lastQuery = model.query;
    this.state.next = model.next;
    this.view.rndrData = await data;
    this.view.carouselView();
    this.view.render();
    this.searchNextListner(this.view);
  }

  async searchNext() {
    if (this.someConst === 1) {
      const model = new AppModel(this.state, this.query);
      const data = await model.getClipData();
      this.state.lastQuery = model.query;
      this.state.next = model.next;
      // eslint-disable-next-line no-console
      console.log(data);
      this.view.rndrData = await data;
      this.view.carouselNextView();
      this.view.render();
    }
  }
}
