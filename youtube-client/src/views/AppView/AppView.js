export default class AppView {
  constructor() {
    this.rndrData = [];
    this.output = '';
    this.where = '';
    this.form = document.createElement('form');
    this.searchField = document.createElement('input');
    this.resultDiv = document.createElement('div');
    this.pageDiv = document.createElement('div');
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
    this.resultDiv.classList.add('result');
    this.resultDiv.setAttribute('id', 'result');
    cont.append(this.resultDiv);
    this.pageDiv.classList.add('page');
    this.pageDiv.setAttribute('id', 'page');
    cont.append(this.pageDiv);
    this.output = section;
    this.where = document.body;
    this.where.append(this.output);
  }

  cardsViev() {
    const ulCards = document.createElement('ul');
    ulCards.setAttribute('id', 'items');
    this.rndrData.forEach((item) => {
      const liItem = document.createElement('li');
      liItem.classList.add('item');
      liItem.innerHTML = `<a href="https://www.youtube.com/watch?v=${item[0]}" target="_blank" class="snippet">
      <img src="${item[6]}" alt="${item[2]}">
      <h3 class="title">${item[2]}</h3>
       <ul>
         <li class="channel">${item[1]}</li>
         <li class="published">${item[4]}</li>
         <li class="views">${item[5]}</li>
       </ul>
       <p class="description">${(item[3].length >= 147) ? item[3].slice(0, 147) : item[3]}...</p>
    </a>`;
      ulCards.append(liItem);
    });
    return ulCards;
  }

  carouselView() {
    this.output = document.createElement('div');
    const navLeft = document.createElement('button');
    navLeft.innerText = '⇦';
    navLeft.classList.add('arrow');
    navLeft.classList.add('prev');
    this.output.append(navLeft);
    this.output.append(this.cardsViev());
    const navRight = document.createElement('button');
    navRight.innerText = '⇨';
    navRight.classList.add('arrow');
    navRight.classList.add('next');
    this.output.append(navRight);
    this.where = document.getElementById('result');
    // eslint-disable-next-line no-console
    console.log(this.where, this.output);
    // this.where.insertAdjacentHTML('beforeend', this.output.innerHTML);
  }

  render() {
    this.where.insertAdjacentHTML('beforeend', this.output.innerHTML);
    // eslint-disable-next-line no-console
    console.log('Renderred');
  }
}
