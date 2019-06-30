export default class AppView {
  constructor() {
    this.content = document.createElement('div');
    this.where = '';
    this.data = [
      ['red', 'dd0000'],
      ['orange', 'fe6230'],
      ['yellow', 'fef600'],
      ['green', '00bb00'],
      ['indigo', '009bfe'],
      ['blue', '000083'],
      ['violet', '30009b'],
      ['white', 'ffffff'],
      ['black', '000000'],
    ];
    this.animate = '';
    this.palette = document.createElement('div');
    this.palette.classList.add('palette');
    this.canvas = document.createElement('div');
    this.canvas.classList.add('canvas');
    this.frames = document.createElement('div');
    this.frames.classList.add('frames');
    this.preview = document.createElement('div');
    this.preview.classList.add('prev');
  }

  colorPalette() {
    const divPalette = document.createElement('div');
    divPalette.classList.add('colors');
    this.data.forEach((color) => {
      const divColor = document.createElement('div');
      divColor.setAttribute('title', color[0]);
      divColor.style.backgroundColor = `#${color[1]}`;
      divPalette.append(divColor);
    });
    return divPalette;
  }

  addFrame() {
    const addFrames = this.frames.querySelector('.new-frame');
    const preFrames = this.frames.querySelector('.fr');

    function createFrame() {
      const frame = document.createElement('div');
      frame.classList.add('frame');
      const opt = document.createElement('div');

      const imgFr = document.createElement('img');
      imgFr.src = 'img.jpg';
      frame.append(imgFr);

      opt.classList.add('opt');
      frame.append(opt);

      const butNum = document.createElement('button');
      butNum.classList.add('num');
      butNum.innerText = preFrames.childElementCount + 1;
      opt.append(butNum);

      const butCopy = document.createElement('button');
      butCopy.classList.add('copy');
      butCopy.innerText = 'copy';
      opt.append(butCopy);

      const butDel = document.createElement('button');
      butDel.classList.add('del');
      butDel.innerText = 'del';
      opt.append(butDel);
      return frame;
    }

    function reIndex() {
      Object.values(preFrames.children).forEach((item, index) => {
        const reItem = item;
        reItem.querySelector('.num').innerText = (index + 1);
      });
    }

    addFrames.addEventListener('click', (event) => {
      event.preventDefault();
      preFrames.append(createFrame());
      reIndex();
    });

    document.querySelector('body').addEventListener('click', (event) => {
      if (event.target.className === 'copy') {
        const elem = event.target.parentNode.parentNode;
        const elemCopy = elem.cloneNode(true);
        const frNumber = elemCopy.querySelector('.num');
        const frInd = parseInt(frNumber.innerText, 10);
        frNumber.innerText = frInd + 1;
        preFrames.insertBefore(elemCopy, preFrames.childNodes[frInd + 1]);
        // preFrames.append(elemCopy);
        reIndex();
      }

      if (event.target.className === 'del') {
        const elem = event.target.parentNode.parentNode;
        elem.remove();
        reIndex();
      }
    });
  }

  canvasInit() {
    const palette = this.palette.querySelector('.colors');
    const canvas = this.canvas.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'Red';
    ctx.lineCap = 'round';
    ctx.lineWidth = 8;

    function canvasMouseMove(e) {
      const x = e.offsetX;
      const y = e.offsetY;
      const dx = e.movementX;
      const dy = e.movementY;

      if (e.buttons > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - dx, y - dy);
        ctx.stroke();
        ctx.closePath();
      }
    }
    canvas.addEventListener('mousemove', canvasMouseMove);

    palette.addEventListener('click', (e) => {
      ctx.strokeStyle = e.target.style.backgroundColor;
    });
  }

  previewInit() {
    const preFrames = this.frames.querySelector('.fr');
    const prevFrame = this.preview.querySelector('.prev-frame');
    const range = this.preview.querySelector('.fps-change');
    const curFps = this.preview.querySelector('.fps-num');
    curFps.innerText = range.value;
    let imgArr = [];
    let anim = '';

    function play(fps) {
      const framesCount = prevFrame.childElementCount;
      let j = 0;
      anim = setInterval(() => {
        if (j === framesCount) {
          j = 0;
        }

        if (j === 0) {
          global.console.log(j);
          prevFrame.children[framesCount - 1].style.display = 'none';
          prevFrame.children[j].style.display = '';
        }

        if (j >= 1) {
          global.console.log(j);
          prevFrame.children[j - 1].style.display = 'none';
          prevFrame.children[j].style.display = '';
        }
        j += 1;
      }, 1000 / fps);
    }
    function startAnimation() {
      setTimeout(() => {
        const arrImgPrepare = [];
        Object.values(preFrames.children).forEach((img) => {
          const elem = img.querySelector('img');
          const cloneElem = elem.cloneNode();
          arrImgPrepare.push(cloneElem);
        });

        global.console.log(preFrames.children);

        imgArr.length = 0;
        imgArr = arrImgPrepare;
        window.clearInterval(anim);
        prevFrame.innerHTML = '';

        for (let i = 0; i <= imgArr.length - 2; i += 1) {
          const elem = imgArr[i];
          if (i === 0) {
            elem.style.display = '';
            prevFrame.append(elem);
          } else {
            elem.style.display = 'none';
            prevFrame.append(elem);
          }
        }
        play(range.value);
      }, 200);
    }
    preFrames.addEventListener('DOMNodeInserted', startAnimation);


    range.addEventListener('input', () => {
      curFps.innerText = range.value;
      clearInterval(anim);
      play(range.value);
    });
  }

  fullScreen() {
    const fullScreen = this.preview.querySelector('.full-screen');
    const prevCont = this.preview.querySelector('.prev-frame');
    fullScreen.addEventListener('click', () => {
      if (prevCont.requestFullscreen) {
        prevCont.requestFullscreen();
      }
    });
  }


  initialView() {
    this.content.innerHTML = '';

    // create and append main container
    const container = document.createElement('div');
    container.classList.add('container');
    this.content.append(container);

    // create and append header
    const header = document.createElement('h1');
    header.innerText = 'Animation Player';
    container.append(header);

    // palette append
    container.append(this.palette);

    // palette container header
    const paletteHeader = document.createElement('h2');
    paletteHeader.innerText = 'Palette:';
    this.palette.append(paletteHeader);

    // append colors
    this.palette.append(this.colorPalette());

    // frames append
    container.append(this.frames);

    // frames container header
    const framesHeader = document.createElement('h2');
    framesHeader.innerText = 'Frames:';
    this.frames.append(framesHeader);

    // create preframe element
    const preFrame = document.createElement('div');
    preFrame.classList.add('fr');
    this.frames.append(preFrame);
    preFrame.innerHTML = `
    <div class="frame">
        <img src="./img.jpg">
        <div class="opt">
            <button class="num">1</button>
            <button class="copy">copy</button>
            <button class="del">del</button>
        </div>
    </div>`;

    // create button to add frames
    const createFramesButton = document.createElement('button');
    createFramesButton.classList.add('new-frame');
    createFramesButton.innerText = 'New Frame';
    this.frames.append(createFramesButton);

    this.addFrame();

    // canvas append
    container.append(this.canvas);

    // create canvas container
    const canv = document.createElement('canvas');
    canv.setAttribute('id', 'canvas');
    canv.setAttribute('width', 600);
    canv.setAttribute('height', 600);
    this.canvas.append(canv);

    // add button to save last frame from canvas
    const saveToFrame = document.createElement('button');
    saveToFrame.classList.add('save');
    saveToFrame.innerText = 'Save to last Frame';
    this.canvas.append(saveToFrame);
    this.canvasInit();

    saveToFrame.addEventListener('click', () => {
      const frame = preFrame.lastElementChild;
      frame.querySelector('img').src = this.canvas.querySelector('#canvas').toDataURL();
    });

    // preview append
    container.append(this.preview);

    // preview container header
    const previewHeader = document.createElement('h2');
    previewHeader.innerText = 'Preview:';
    this.preview.append(previewHeader);

    // create prev-frame element
    const prevFrame = document.createElement('div');
    prevFrame.classList.add('prev-frame');
    this.preview.append(prevFrame);

    // create FPS indicator
    const fpsInd = document.createElement('span');
    fpsInd.classList.add('fps-num');
    this.preview.append(fpsInd);

    // create FPS input range
    const fpsRange = document.createElement('input');
    fpsRange.classList.add('fps-change');
    fpsRange.setAttribute('type', 'range');
    fpsRange.setAttribute('min', '1');
    fpsRange.setAttribute('max', '30');
    fpsRange.setAttribute('value', '1');
    fpsRange.setAttribute('step', '1');
    this.preview.append(fpsRange);

    // create FPS indicator
    const fpsWord = document.createElement('span');
    fpsWord.innerText = 'FPS';
    this.preview.append(fpsWord);

    this.previewInit();

    // add button fullscreen mode
    const fullScreen = document.createElement('button');
    fullScreen.classList.add('full-screen');
    fullScreen.innerText = 'Full Screen';
    this.preview.append(fullScreen);

    this.where = document.body;
  }

  render() {
    this.where.append(this.content);
  }
}
