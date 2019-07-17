import Tools from './Tools';
import Frames from './Frames';
import Canvas from './Canvas';

export default class AppView {
  constructor() {
    this.data = {};
    this.dataCfg = {};
    this.output = document.createElement('div');
    this.where = document.body;
    this.tools = new Tools();
    this.frames = new Frames();
    this.canvas = new Canvas();
    this.sectTools = document.createElement('section');
    this.sectFrames = document.createElement('section');
    this.sectDraw = document.createElement('section');
    this.sectPreview = document.createElement('section');
  }

  static headerInit() {
    const header = document.createElement('header');

    const logoHref = document.createElement('a');
    logoHref.classList.add('logo');
    logoHref.href = 'index.html';
    header.append(logoHref);

    const logoImg = document.createElement('img');
    logoImg.src = './img/logo.png';
    logoImg.alt = 'Piskel Clone';
    logoHref.append(logoImg);

    const divAuth = document.createElement('div');
    divAuth.classList.add('credentials');
    header.append(divAuth);

    const butCreate = document.createElement('button');
    butCreate.classList.add('create-sprite');
    butCreate.innerText = 'Create Sprite';
    divAuth.append(butCreate);

    const butSign = document.createElement('button');
    butSign.innerText = 'Sign In';
    divAuth.append(butSign);

    return header;
  }

  static footerInit() {
    const footer = document.createElement('footer');

    const divCanvasSize = document.createElement('div');
    divCanvasSize.classList.add('canvas-size');
    footer.append(divCanvasSize);

    const spanSize = document.createElement('span');
    spanSize.innerText = 'Canvas Size:';
    divCanvasSize.append(spanSize);

    const selectSize = document.createElement('select');
    selectSize.classList.add('canvas-size');
    divCanvasSize.append(selectSize);

    const size32 = document.createElement('option');
    size32.value = 32;
    size32.innerText = '32x32';
    selectSize.append(size32);

    const size64 = document.createElement('option');
    size64.value = 64;
    size64.innerText = '64x64';
    selectSize.append(size64);

    const size128 = document.createElement('option');
    size128.value = 128;
    size128.innerText = '128x128';
    selectSize.append(size128);

    const divCoord = document.createElement('div');
    divCoord.classList.add('coord');
    divCoord.innerHTML = 'X:<span>0</span> Y:<span>0</span>';
    footer.append(divCoord);

    const butCont = document.createElement('div');
    butCont.classList.add('but-cont');
    footer.append(butCont);


    const butOptions = document.createElement('button');
    butOptions.classList.add('options');
    butOptions.classList.add('full-screen');
    butOptions.innerText = 'FullScreen';
    butCont.append(butOptions);

    const butSave = document.createElement('button');
    butSave.classList.add('options');
    butSave.classList.add('save');
    butSave.innerText = 'Save';
    butCont.append(butSave);

    return footer;
  }

  mainInit() {
    this.flag = '';
    const mainBlock = document.createElement('main');

    this.sectTools.classList.add('tools');
    this.sectTools.append(this.tools.generatePensSizes(this.data.config.settings.penSize));
    this.sectTools.append(this.tools.generateTools({
      data: this.data.config.initial.commonTools,
      cont: this.tools.ulToolsCont,
      className: 'instruments',
    }));
    this.sectTools.append(this.tools.generateColorSelector(this.data.config.settings.fastColors));
    mainBlock.append(this.sectTools);

    this.sectFrames.classList.add('frames');
    this.sectFrames.append(this.frames.initFrame(this.data));
    this.sectFrames.append(Frames.addButton());
    mainBlock.append(this.sectFrames);

    this.sectDraw.classList.add('draw');
    mainBlock.append(this.sectDraw);
    const drawCont = document.createElement('div');
    drawCont.classList.add('draw-container');
    this.sectDraw.append(drawCont);
    drawCont.append(this.canvas.mainCanvas(this.data));
    drawCont.append(this.canvas.altCanvas(this.data));
    const imgHidden = document.createElement('img');
    this.sectDraw.append(imgHidden);

    this.sectPreview.classList.add('preview');
    this.sectPreview.append(Tools.generatePreviewFrame());
    this.sectPreview.append(Tools.generateFpsSet(this.data));
    this.sectPreview.append(this.tools.generatePaletteTool(this.data));
    mainBlock.append(this.sectPreview);

    return mainBlock;
  }


  init() {
    this.output.innerHTML = '';
    this.output.append(AppView.headerInit());
    this.output.append(this.mainInit());
    this.output.append(AppView.footerInit());
    this.output.append(this.tools.generatePaletteModal(this.data));
    this.where = document.body;
  }

  render() {
    this.where.insertAdjacentHTML('beforeend', this.output.innerHTML);
  }
}
