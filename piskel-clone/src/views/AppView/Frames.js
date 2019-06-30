export default class Frames {
  constructor() {
    this.ulFrames = document.createElement('ul');
    this.flag = '';
  }

  static setFrame(num, type, src) {
    const li = document.createElement('li');
    li.classList.add('frame');
    if (num === 1) li.classList.add('active');

    const img = document.createElement('img');
    img.src = src;
    if (type === 'empty') img.classList.add('hidden');
    li.append(img);

    const divControls = document.createElement('div');
    divControls.classList.add('controls');
    li.append(divControls);

    const spanNum = document.createElement('span');
    spanNum.classList.add('num');
    spanNum.innerText = num;
    divControls.append(spanNum);

    const spanDel = document.createElement('span');
    spanDel.classList.add('del');
    divControls.append(spanDel);

    const spanMove = document.createElement('span');
    spanMove.classList.add('move');
    divControls.append(spanMove);

    const spanCopy = document.createElement('span');
    spanCopy.classList.add('copy');
    divControls.append(spanCopy);

    return li;
  }

  static addButton() {
    const butAdd = document.createElement('button');
    butAdd.classList.add('add-new-frame');
    butAdd.innerText = 'Add new frame';
    return butAdd;
  }


  initFrame(modelApp) {
    const cfg = modelApp.config;
    if (cfg.frames.length > 0) {
      cfg.frames.forEach((frame, index) => {
        this.ulFrames.append(Frames.setFrame(index + 1, 'ex', frame));
      });
    } else {
      this.ulFrames.append(Frames.setFrame(1));
    }
    return this.ulFrames;
  }

  framesListner(modelApp) {
    this.flag = '';
    const framesContainer = document.querySelector('.frames');
    const canvas = document.querySelector('#drawCanvas');
    const ctx = canvas.getContext('2d');

    let getLeaveLi = '';
    let isDown = false;
    let moveY = '';
    let liEmpty = '';

    function reIndex(frameCont) {
      Object.values(frameCont.children).forEach((el, index) => {
        // eslint-disable-next-line no-param-reassign
        el.querySelector('.num').innerText = (index + 1);
      });
    }

    function saveFrames() {
      const getPrevFrame = document.querySelector('.prev-frame');
      getPrevFrame.innerHTML = '';
      const getImages = framesContainer.getElementsByTagName('img');
      const imgSrcs = [];
      Object.values(getImages).forEach((img, index) => {
        if (!img.classList.contains('hidden')) {
          imgSrcs.push(img.src);
          const imgToPrev = document.createElement('img');
          if (index === 0) {
            imgToPrev.style.display = '';
          } else {
            imgToPrev.style.display = 'none';
          }
          imgToPrev.src = img.src;
          getPrevFrame.append(imgToPrev);
        }
      });
      modelApp.saveFrames(imgSrcs);
    }

    saveFrames();

    function createNewFrame(num) {
      const li = document.createElement('li');
      li.classList.add('frame');

      const img = document.createElement('img');
      img.src = '';
      img.classList.add('hidden');
      li.append(img);

      const divControls = document.createElement('div');
      divControls.classList.add('controls');
      li.append(divControls);

      const spanNum = document.createElement('span');
      spanNum.classList.add('num');
      spanNum.innerText = num;
      divControls.append(spanNum);

      const spanDel = document.createElement('span');
      spanDel.classList.add('del');
      divControls.append(spanDel);

      const spanMove = document.createElement('span');
      spanMove.classList.add('move');
      divControls.append(spanMove);

      const spanCopy = document.createElement('span');
      spanCopy.classList.add('copy');
      divControls.append(spanCopy);

      return li;
    }

    function framesClickListner(event) {
      const elem = event.target;

      if (elem.className === 'controls') {
        const getActive = framesContainer.querySelector('.frame.active');
        if (getActive) getActive.classList.remove('active');
        elem.parentNode.classList.add('active');
        const getFrameImg = elem.parentNode.querySelector('img');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(getFrameImg, 0, 0, canvas.width, canvas.height);
      }

      if (elem.classList.contains('add-new-frame')) {
        const getFramesUl = framesContainer.querySelector('ul');
        const newFrame = createNewFrame(getFramesUl.childElementCount + 1);
        getFramesUl.append(newFrame);
        const getActive = framesContainer.querySelector('.frame.active');
        if (getActive) getActive.classList.remove('active');
        getFramesUl.lastElementChild.classList.add('active');
        const getFrameImg = newFrame.querySelector('img');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(getFrameImg, 0, 0, canvas.width, canvas.height);
        saveFrames();
      }

      if (elem.parentNode.classList.contains('controls')) {
        if (elem.classList.contains('move')) {
          const getActive = framesContainer.querySelector('.frame.active');
          if (getActive) getActive.classList.remove('active');
          elem.parentNode.parentNode.classList.add('active');
        }

        if (elem.classList.contains('copy')) {
          const listFrames = framesContainer.querySelector('ul');
          const frameToCopy = elem.parentNode.parentNode;
          const newCopiedFrame = frameToCopy.cloneNode(true);
          newCopiedFrame.classList.remove('active');
          const getCopyFrameNumber = newCopiedFrame.querySelector('.num');
          const frIndex = parseInt(getCopyFrameNumber.innerText, 10);
          getCopyFrameNumber.innerText = frIndex + 1;
          listFrames.insertBefore(newCopiedFrame, listFrames.childNodes[frIndex]);
          reIndex(listFrames);
          saveFrames();
        }

        if (elem.classList.contains('del')) {
          const listFrames = framesContainer.querySelector('ul');
          if (listFrames.childElementCount > 1) {
            const getNumEl = elem.parentNode.querySelector('.num').innerText;
            elem.parentNode.parentNode.remove();
            listFrames.children[parseInt(getNumEl, 10) - 2].classList.add('active');
            reIndex(listFrames);
            saveFrames();
          }
        }
      }
    }

    function mouseDownListner(e) {
      if (e.target.classList.contains('move')) {
        moveY = e.clientY;
        isDown = true;
        getLeaveLi = e.target.parentNode.parentNode;

        liEmpty = document.createElement('li');
        liEmpty.classList.add('frame');
        liEmpty.classList.add('empty');

        getLeaveLi.classList.add('leave');
        document.querySelector('.frame.leave').style.offsetTop = getLeaveLi.offsetTop;

        getLeaveLi.before(liEmpty);
      }
    }

    function mouseMoveListner(e) {
      if (isDown && getLeaveLi) {
        getLeaveLi.style.top = `${e.clientY - 90}px`;
        if ((moveY) > e.clientY && (moveY - 98) > e.clientY) {
          if (liEmpty.previousElementSibling !== null) {
            liEmpty.previousElementSibling.before(liEmpty);
          }
          moveY -= 120;
        }

        if ((moveY) < e.clientY && (moveY + 30) < e.clientY) {
          if (liEmpty.nextElementSibling !== null) {
            liEmpty.before(liEmpty.nextElementSibling);
          }
          moveY += 98;
        }
      }
    }

    function mouseUpListner() {
      if (isDown) {
        getLeaveLi.parentNode.insertBefore(getLeaveLi, liEmpty);
        liEmpty.remove();
        getLeaveLi.removeAttribute('style');
        getLeaveLi.classList.remove('leave');
        reIndex(getLeaveLi.parentNode);
      }
      isDown = false;
      saveFrames();
    }
    framesContainer.addEventListener('mousedown', mouseDownListner);
    framesContainer.addEventListener('mousemove', mouseMoveListner);
    framesContainer.addEventListener('mouseup', mouseUpListner);
    framesContainer.addEventListener('click', framesClickListner, true);
  }
}
