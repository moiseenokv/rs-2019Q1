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
        searchNext: 'pageToken=',
        videoMethod: 'videos',
        videoAdd: 'part=snippet,statistics',

        // https://www.googleapis.com/youtube/v3/search? pageToken=CBkQAA& part=snippet&maxResults=25&order=relevance&q=site%3Ayoutube.com&topicId=%2Fm%2F02vx4&key={YOUR_API_KEY
      },
      // 'https://www.googleapis.com/youtube/v3/search? key=AIzaSyBaLSU8QondHsteJQpRo7mGoViGDzCHcXo&type=video&part=snippet&maxResults=15&q="javascript"',
      // https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=nq4aU9gmZQk,REu2BcnlD34,qbPTdW7KgOg&part=snippet,statistics
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
    // this.view.render();
    // eslint-disable-next-line no-console
    // console.log(await data);
  }
}
