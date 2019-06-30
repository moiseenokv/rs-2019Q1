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
    divCanvasSize.innerHTML = 'Canvas Size: <span>32x32</span>';
    footer.append(divCanvasSize);

    const divZoom = document.createElement('div');
    divZoom.classList.add('zoom');
    divZoom.innerHTML = 'Zoom: <span>1</span></span>';
    footer.append(divZoom);

    const divCoord = document.createElement('div');
    divCoord.classList.add('coord');
    divCoord.innerHTML = 'X:<span>0</span> Y:<span>0</span>';
    footer.append(divCoord);


    const butOptions = document.createElement('button');
    butOptions.classList.add('options');
    butOptions.innerText = 'Options';
    footer.append(butOptions);

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
    this.sectFrames.append(this.frames.initFrame());
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
    this.sectPreview.append(Tools.generateFpsSet());
    const transformToolsData = this.data.config.initial.transformTools;
    this.sectPreview.append(this.tools.generateTransformManager(transformToolsData));
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
