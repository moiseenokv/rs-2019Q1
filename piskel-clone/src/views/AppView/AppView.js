// import Carousel from './CarouselClass';

export default class AppView {
  constructor() {
    this.output = '';
    this.where = document.body;
  }

  render() {
    this.output = document.createElement('h1');
    this.output.innerText = 'Hello';
    // this.where.insertAdjacentHTML('beforeend', this.output.innerHTML);
    this.where.append(this.output);
  }
}
