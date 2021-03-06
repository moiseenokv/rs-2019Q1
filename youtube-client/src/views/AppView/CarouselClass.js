export default class Carousel {
  constructor() {
    this.carouselItems = '';
    this.cont = document.createElement('div');
    this.carContainer = '';
    this.pageItems = '';
    this.nextPage = '';
    this.currPage = '';
  }

  prepare() {
    this.carContainer = document.createElement('div');
    this.carContainer.setAttribute('id', 'carousel');
    this.carContainer.setAttribute('class', 'carousel');
    return this.carContainer;
  }

  addPages() {
    this.pageItems = document.createElement('div');
    this.pageItems.setAttribute('class', 'pages');

    const pageUl = document.createElement('ul');
    this.pageItems.append(pageUl);

    const pageLiPrv = document.createElement('li');
    pageLiPrv.classList.add('prv');
    pageUl.append(pageLiPrv);

    const pageLiCur = document.createElement('li');
    pageLiCur.classList.add('curr');
    pageUl.append(pageLiCur);

    const pageLiNxt = document.createElement('li');
    pageLiNxt.classList.add('nxt');
    pageUl.append(pageLiNxt);

    return this.pageItems;
  }

  addCarousel() {
    this.cont.innerHTML = '';

    const navLeft = document.createElement('button');
    navLeft.classList.add('arrow');
    navLeft.classList.add('prev');
    navLeft.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-left" class="svg-inline--fa fa-arrow-circle-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path></svg>';
    this.cont.append(navLeft);

    const gallery = document.createElement('div');
    gallery.setAttribute('class', 'gallery');
    this.cont.append(gallery);

    const carItems = this.generateItems();
    carItems.firstChild.classList.add('active');
    gallery.append(carItems);

    const navRight = document.createElement('button');
    navRight.classList.add('arrow');
    navRight.classList.add('next');
    navRight.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-right" class="svg-inline--fa fa-arrow-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path></svg>';
    this.cont.append(navRight);

    return this.cont.innerHTML;
  }

  generateItems() {
    const ulCards = document.createElement('ul');
    ulCards.setAttribute('class', 'images');
    this.carouselItems.forEach((item) => {
      const liItem = document.createElement('li');
      liItem.innerHTML = `<a href="https://www.youtube.com/watch?v=${item[0]}" target="_blank" class="snippet">
      <img src="${item[6]}" alt="${item[2]}">
      <div class="info">
        <h3 class="title">${item[2]}</h3>
        <ul>
          <li class="channel">${item[1]}</li>
          <li class="published">${item[4]}</li>
          <li class="views">${item[5]}</li>
        </ul>
        <p class="description">${(item[3].length >= 147) ? item[3].slice(0, 147) : item[3]}...</p>
       </div>
    </a>`;
      ulCards.append(liItem);
    });
    return ulCards;
  }

  addCarouseljs() {
    const width = 314;
    let count = 4;
    const carousel = this.carContainer;
    const list = carousel.querySelector('ul.images');
    let listElems = carousel.querySelectorAll('ul.images > li');
    const pCont = document.querySelectorAll('.pages li');
    let position = 0;
    let prevPosition = 0;
    let currPage = 1;
    let isDown = false;
    let startX = 0;
    let endX = 0;

    function isMobile() {
      return (/iphone|ipod|ipad|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase());
    }

    function setConfig() {
      const gal = carousel.querySelector('.gallery');

      if (window.innerWidth >= 1337) {
        carousel.style.width = '1256px;';
        gal.style.width = '1256px;';
        count = 4;
      }
      if (window.innerWidth <= 1337) {
        carousel.style.width = '942px;';
        gal.style.width = '942px;';
        count = 3;
      }
      if (window.innerWidth <= 1044) {
        carousel.style.width = '628px;';
        gal.style.width = '628px;';
        count = 2;
      }
      if (window.innerWidth <= 720) {
        carousel.style.width = '314px;';
        gal.style.width = '314px;';
        count = 1;
      }

      if (isMobile()) {
        Object.values(carousel.querySelectorAll('.arrow'))
          .forEach((item) => {
            const arr = item;
            arr.style.cssText = 'display:none;';
          });
        carousel.style.cssText = 'width:314px; padding:10px';
        gal.style.cssText = 'width:314px;';
        count = 1;
      }
    }

    function pagesInit(pageNumber) {
      const pages = Math.ceil(carousel.querySelector('ul.images').childElementCount / count);
      pCont[0].innerHTML = 1;
      pCont[1].innerHTML = pageNumber;
      pCont[2].innerHTML = pages;
    }

    function getActiveItem() {
      const childItem = carousel.querySelector('.carousel li.active');
      const parentItem = childItem.parentNode;
      const getIndex = Array.prototype.indexOf.call(parentItem.children, childItem);
      return getIndex;
    }

    function setActiveItem(type) {
      let active = getActiveItem();
      listElems = carousel.querySelectorAll('ul.images > li');

      function leftPages() {
        if (active >= 0) {
          return Math.ceil((active + 1) / count);
        }
        return false;
      }

      if (type === 'next' && type !== '') {
        listElems[active].classList.remove('active');
        if ((active + count) <= listElems.length) {
          listElems[active + count].classList.add('active');
        } else {
          listElems[listElems.length - 1].classList.add('active');
        }
      }

      if (type === 'prev' && type !== '') {
        listElems[active].classList.remove('active');
        listElems[active - count].classList.add('active');
      }

      active = getActiveItem();
      pCont[1].innerHTML = leftPages();
      pagesInit(pCont[1].innerHTML);
    }

    function windowListnerLoad() {
      setConfig();
      pagesInit(1);
    }

    function windowListnerResize() {
      setConfig();
      pagesInit(pCont[1].innerHTML);
      setActiveItem();
    }

    function prevClick() {
      prevPosition = position;
      position = Math.min(position + width * count, 0);
      list.style.marginLeft = `${position}px`;
      if (position !== prevPosition) {
        this.currPage = currPage;
        currPage -= 1;
        this.nextPage = currPage;
        pCont[1].innerHTML = currPage;
        setActiveItem('prev');
      }
    }

    function nextClick() {
      prevPosition = position;
      position = Math.max(position - width * count, -width * (listElems.length - count));
      list.style.marginLeft = `${position}px`;
      if (position !== prevPosition) {
        this.currPage = currPage;
        currPage += 1;
        this.nextPage = currPage;
        pCont[1].innerHTML = currPage;
        setActiveItem('next');
      }
    }

    function mousedownListner(ev) {
      ev.preventDefault();
      isDown = true;
      startX = ev.pageX;
    }

    function mouseleaveListner() {
      isDown = false;
      list.classList.remove('down');
    }

    function mouseupListner(ev) {
      isDown = false;
      endX = ev.pageX;
      list.classList.remove('down');
      if ((endX - startX) > 0 && isDown === false) {
        carousel.querySelector('.next').click();
      } else {
        carousel.querySelector('.prev').click();
      }
    }

    function touchstartListner(ev) {
      isDown = true;
      startX = ev.changedTouches[0].pageX;
    }

    function touchleaveListner() {
      global.console.log('touch leave fired');
    }

    function touchendListner(ev) {
      isDown = false;
      endX = ev.changedTouches[0].pageX;
      if ((endX - startX) > 0) {
        carousel.querySelector('.next').click();
      }
      if ((endX - startX) < 0) {
        carousel.querySelector('.prev').click();
      }
    }

    window.addEventListener('resize', windowListnerResize);
    window.addEventListener('load', windowListnerLoad);
    carousel.querySelector('.prev').addEventListener('click', prevClick);
    carousel.querySelector('.next').addEventListener('click', nextClick);
    list.addEventListener('mousedown', mousedownListner);
    list.addEventListener('mouseleave', mouseleaveListner);
    list.addEventListener('mouseup', mouseupListner);
    list.addEventListener('touchstart', touchstartListner);
    list.addEventListener('touchleave', touchleaveListner);
    list.addEventListener('touchend', touchendListner);
  }
}
