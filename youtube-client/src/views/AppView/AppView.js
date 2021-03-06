import Carousel from './CarouselClass';

export default class AppView {
  constructor() {
    this.rndrData = [];
    this.output = '';
    this.where = '';
    this.form = document.createElement('form');
    this.searchField = document.createElement('input');
    this.carousel = new Carousel();
    this.carContainer = this.carousel.prepare();
    this.pageDiv = document.createElement('div');
    this.currPage = '';
    this.lastPage = '';
    this.nextPack = '';
  }

  init() {
    this.output = document.createElement('div');

    const section = document.createElement('section');
    const cont = document.createElement('div');
    cont.classList.add('container');
    section.append(cont);

    const header = document.createElement('h1');
    header.innerText = 'Welcome to Youtube App Searcher';
    cont.append(header);

    const searchDiv = document.createElement('div');
    searchDiv.classList.add('search');
    cont.append(searchDiv);
    this.searchField.type = 'text';
    this.searchField.name = 'query';
    this.searchField.placeholder = 'Input search data';
    this.form.append(this.searchField);
    const searchButton = document.createElement('input');
    searchButton.type = 'submit';
    searchButton.value = 'Search';
    this.form.append(searchButton);
    searchDiv.append(this.form);
    cont.append(this.carContainer);
    this.output = section;
    this.where = document.body;
    this.where.append(this.output);
  }

  carouselView(type) {
    if (type === 'new') {
      document.getElementById('carousel').innerHTML = '';
      this.carousel.carouselItems = this.rndrData;
      this.output = document.createElement('div');
      this.output.insertAdjacentHTML('beforeend', this.carousel.addCarousel());
      this.output.append(this.carousel.addPages());
      this.where = document.getElementById('carousel');
      this.addCarouseljs();
    }
    if (type === 'next') {
      this.carousel.carouselItems = this.rndrData;
      this.output.innerHTML = '';
      this.output = this.carousel.generateItems();
      this.where = document.querySelector('.images');
      this.addCarouseljs();
    }
  }

  addCarouseljs() {
    setTimeout(() => {
      this.carousel.addCarouseljs();
      this.currPage = document.querySelector('.curr');
      this.lastPage = document.querySelector('.nxt');
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  render() {
    this.where.insertAdjacentHTML('beforeend', this.output.innerHTML);
  }
}
