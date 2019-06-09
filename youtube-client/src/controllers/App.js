import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.view = '';
    this.query = '';
    this.renderData = '';
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/',
      key: 'AIzaSyBXpR3MRXN4v6ObqACVmBa6bSkQuEXXMSA',
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
    this.listnerNext = 0;
  }

  nextPackListner() {
    this.listnerNext = 0;
    let got = 0;
    this.view.carContainer.querySelector('.pages li').addEventListener('DOMNodeInserted', () => {
      if (got === 0) {
        const clickNext = this.view.carContainer.querySelector('.next');
        clickNext.addEventListener('click', () => {
          const pages = this.view.carContainer.querySelectorAll('.pages li');
          const getLastPage = parseInt(pages[2].innerText, 10);
          const getCurrPage = parseInt(pages[1].innerText, 10);
          if ((getLastPage - getCurrPage) === 1) {
            this.searchNext();
          }
        });
        got = 1;
      }
    });
  }

  init() {
    this.view = new AppView(this.renderData);
    this.searchListner(this.view);
    this.view.init();
  }

  searchListner(appView) {
    appView.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.query = appView.searchField.value.trim();
      if (this.query !== '') {
        this.search();
      } else {
        global.window.alert('Your query input is empty! ');
      }
    });
  }

  async searchNext() {
    const dataNext = await this.model.getClipDataNext();
    this.view.rndrData = await dataNext;
    this.view.carouselView('next');
    this.view.render();
  }

  async search() {
    this.model.state = this.state;
    this.model.query = this.query;
    const data = await this.model.getClipData();
    this.view.rndrData = await data;
    this.view.carouselView('new');
    this.view.render();
    this.nextPackListner();
  }
}
