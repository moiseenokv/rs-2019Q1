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

  mainInit() {
    this.flag = '';
    const mainBlock = document.createElement('main');

    this.sectTools.classList.add('tools');
    this.sectTools.append(this.tools.generatePensSizes(this.data.penSizes));
    this.sectTools.append(this.tools.generateTools({
      data: this.data.tools,
      cont: this.tools.ulToolsCont,
      className: 'instruments',
    }));
    this.sectTools.append(this.tools.generateColorSelector(this.data.colorSelect));
    mainBlock.append(this.sectTools);

    this.sectFrames.classList.add('frames');
    this.sectFrames.append(this.frames.initFrame());
    this.sectFrames.append(Frames.addButton());
    mainBlock.append(this.sectFrames);

    this.sectDraw.classList.add('draw');
    mainBlock.append(this.sectDraw);
    this.sectDraw.append(this.canvas.mainCanvas());

    this.sectPreview.classList.add('preview');
    this.sectPreview.append(Tools.generatePreviewFrame());
    this.sectPreview.append(Tools.generateFpsSet());
    this.sectPreview.append(this.tools.generateTransformManager(this.data.transformTools));
    this.sectPreview.append(Tools.generatePaletteTool());
    mainBlock.append(this.sectPreview);

    return mainBlock;
  }


  init() {
    this.output.innerHTML = '';
    this.output.append(AppView.headerInit());
    this.output.append(this.mainInit());
    this.where = document.body;
  }

  render() {
    this.where.insertAdjacentHTML('beforeend', this.output.innerHTML);
  }
}
