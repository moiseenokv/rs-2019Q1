export default class Tools {
  constructor() {
    this.divPenSizes = document.createElement('div');
    this.ulToolsCont = document.createElement('ul');
    this.ulToolsContTrans = document.createElement('ul');
    this.toolTemplate = document.createElement('div');
    this.colorSelect = document.createElement('ul');
    this.flag = '';
  }

  generatePensSizes(data) {
    const getSize = data;
    this.divPenSizes.classList.add('pen-size');
    for (let i = 1; i <= 4; i += 1) {
      const sizeSpan = document.createElement('span');
      sizeSpan.classList.add(`size-${i}x`);
      this.divPenSizes.append(sizeSpan);
    }
    this.divPenSizes.children[getSize - 1].classList.add('active');
    return this.divPenSizes;
  }

  generateTools(obj) {
    obj.cont.classList.add(obj.className);
    obj.data.forEach((tool) => {
      const li = document.createElement('li');
      if (tool.hotKey[0] !== 'none') li.classList.add('tool');

      li.classList.add(tool.class);
      this.toolTemplate.append(li);

      const divTooltip = document.createElement('div');
      divTooltip.classList.add('tooltip');
      li.append(divTooltip);

      const divTooltipText = document.createElement('div');
      divTooltipText.classList.add('tooltiptext');
      if (tool.hotKey[0] === 'none') {
        divTooltipText.innerHTML = `${tool.hotKey[1]}`;
      } else {
        divTooltipText.innerHTML = `${tool.hotKey[1]} <span>(${tool.hotKey[0]})</span>`;
      }
      divTooltip.append(divTooltipText);

      obj.cont.append(li);
    });
    return obj.cont;
  }

  toolsListner(modelApp) {
    this.flag = '';
    const getToolCont = document.querySelector('.tools');
    const canvas = document.querySelector('#drawCanvas');
    const canvasAlt = document.querySelector('#drawCanvasAlt');
    const ctx = canvas.getContext('2d');
    const ctxAlt = canvasAlt.getContext('2d');


    getToolCont.addEventListener('click', (event) => {
      // global.console.log(event.target);

      // working with tools
      if (event.target.classList.contains('tool')) {
        modelApp.setProperty('usingTool', event.target.classList[1]);
        const getActive = getToolCont.querySelector('.tool.active');
        if (getActive) getActive.classList.remove('active');
        event.target.classList.add('active');

        if (event.target.classList.contains('color-pick')) {
          global.console.log('color-picker clicked');
        }
      }

      // working with pen-size block
      if (event.target.parentNode.classList.contains('pen-size')) {
        const cfg = modelApp.config.settings;
        const penSize = event.target;
        modelApp.setProperty('penSize', penSize.classList[0].slice(5, -1));
        const getActive = getToolCont.querySelector('.pen-size > .active');
        if (getActive) getActive.classList.remove('active');
        penSize.classList.add('active');

        ctx.lineWidth = cfg.width / cfg.canvasSize * cfg.penSize;
        ctx.lineHeight = cfg.width / cfg.canvasSize * cfg.penSize;

        ctxAlt.lineWidth = cfg.width / cfg.canvasSize * cfg.penSize;
        ctxAlt.lineHeight = cfg.width / cfg.canvasSize * cfg.penSize;
      }

      // working with fast-colors block
      if (event.target.parentNode.classList.contains('fast-colors')) {
        if (event.target.classList.contains('primary') || event.target.classList.contains('secondary')) {
          const getParent = event.target.parentNode;
          const tempColor = getParent.childNodes[0].style.background;
          getParent.childNodes[0].style.background = getParent.childNodes[1].style.background;
          getParent.childNodes[1].style.background = tempColor;
          modelApp.setProperty('fastColors', [getParent.childNodes[0].style.background, getParent.childNodes[1].style.background]);
          ctx.strokeStyle = getParent.childNodes[0].style.background;
          ctxAlt.strokeStyle = getParent.childNodes[0].style.background;
        }
      }

      global.console.log(modelApp.config.settings);
    });
  }

  generateColorSelector(data) {
    this.colorSelect.classList.add('fast-colors');
    data.forEach((color, index) => {
      const li = document.createElement('li');
      li.classList.add(index === 0 ? 'primary' : 'secondary');
      li.style.background = color;
      this.colorSelect.append(li);
    });
    return this.colorSelect;
  }

  static generatePreviewFrame() {
    const divPrev = document.createElement('div');
    divPrev.classList.add('prev-frame');
    return divPrev;
  }

  static generateFpsSet() {
    const divFpsCont = document.createElement('div');
    divFpsCont.classList.add('fps-set');

    const label = document.createElement('label');
    label.htmlFor = 'fps-range';
    label.innerHTML = '<span>0</span> FPS';
    divFpsCont.append(label);

    const input = document.createElement('input');
    input.id = 'fps-range';
    input.type = 'range';
    input.min = 0;
    input.max = 24;
    input.setAttribute('value', 2);
    divFpsCont.append(input);

    return divFpsCont;
  }

  generateTransformManager(toolData) {
    const transManager = document.createElement('div');
    transManager.classList.add('transform-manager');

    const pHead = document.createElement('p');
    pHead.innerText = 'Transform';
    transManager.append(pHead);

    transManager.append(this.generateTools({
      data: toolData,
      cont: this.ulToolsContTrans,
      className: 'additional-tools',
    }));

    return transManager;
  }

  generatePaletteTool(modelApp) {
    this.flag = '';
    const cfg = modelApp.config.settings;

    const divPalette = document.createElement('div');
    divPalette.classList.add('palette-manager');

    const pHead = document.createElement('p');
    pHead.innerText = 'Palette';
    divPalette.append(pHead);

    const addBut = document.createElement('button');
    addBut.classList.add('color-editor');
    addBut.classList.add('butt');
    addBut.innerText = '+';
    divPalette.append(addBut);

    const ulColors = document.createElement('ul');
    ulColors.classList.add('colors');
    divPalette.append(ulColors);

    cfg.palettePresets.forEach((color) => {
      const liPreset = document.createElement('li');
      liPreset.style.backgroundColor = color;
      liPreset.setAttribute('data-color', color);
      ulColors.append(liPreset);
    });

    return divPalette;
  }

  paletteToolListner() {
    this.flag = '';
    const setColor = document.querySelector('.palette-manager .colors');

    const canvas = document.querySelector('#drawCanvas');
    const canvasAlt = document.querySelector('#drawCanvasAlt');
    const ctx = canvas.getContext('2d');
    const ctxAlt = canvasAlt.getContext('2d');

    function setColorListner(e) {
      const toFastColors = document.querySelector('.fast-colors');
      if (e.target.hasAttribute('data-color')) {
        const colorPrepare = e.target.getAttribute('data-color');
        const colorFirstChild = toFastColors.firstChild.style.backgroundColor;
        toFastColors.firstChild.style.backgroundColor = colorPrepare;
        toFastColors.lastChild.style.backgroundColor = colorFirstChild;
        ctx.strokeStyle = colorPrepare;
        ctxAlt.strokeStyle = colorPrepare;
      }
    }

    setColor.addEventListener('click', setColorListner);
  }

  generatePaletteModal(modelApp) {
    this.flag = '';
    const cfg = modelApp.config.settings;

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');

    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add('modal-content');
    modalDiv.append(modalContentDiv);

    const closeButtonModal = document.createElement('span');
    closeButtonModal.classList.add('close-button');
    closeButtonModal.innerText = 'x';
    modalContentDiv.append(closeButtonModal);

    const titleModal = document.createElement('h3');
    titleModal.innerText = 'Palette Colors Add';
    modalContentDiv.append(titleModal);

    const paletteContDiv = document.createElement('div');
    paletteContDiv.classList.add('palette-container');
    modalContentDiv.append(paletteContDiv);

    const ulPaletteTemplates = document.createElement('ul');
    ulPaletteTemplates.classList.add('palette-templates');
    paletteContDiv.append(ulPaletteTemplates);

    const liColorTemplate = document.createElement('li');
    liColorTemplate.classList.add('template');
    liColorTemplate.style.display = 'none';
    ulPaletteTemplates.append(liColorTemplate);

    const closeButtonTemplate = document.createElement('span');
    closeButtonTemplate.innerText = 'x';
    liColorTemplate.append(closeButtonTemplate);

    const liColorAddTemplate = document.createElement('li');
    liColorAddTemplate.classList.add('add');
    liColorAddTemplate.innerHTML = '+';
    ulPaletteTemplates.append(liColorAddTemplate);

    cfg.palettePresets.forEach((color) => {
      const liPreset = document.createElement('li');
      liPreset.classList.add('template');
      liPreset.style.backgroundColor = color;
      liPreset.setAttribute('data-color', color);
      const closeButton = document.createElement('span');
      closeButton.innerText = 'x';
      liPreset.append(closeButton);
      ulPaletteTemplates.insertBefore(liPreset, liColorAddTemplate);
    });

    const divPickerCont = document.createElement('div');
    divPickerCont.classList.add('picker');
    paletteContDiv.append(divPickerCont);

    const canvasColorPicker = document.createElement('canvas');
    canvasColorPicker.id = 'palettCnv';
    canvasColorPicker.width = 230;
    canvasColorPicker.height = 230;
    divPickerCont.append(canvasColorPicker);

    const ulColorInfo = document.createElement('ul');
    ulColorInfo.classList.add('color-info');
    paletteContDiv.append(ulColorInfo);

    const liColorInfoCurrColor = document.createElement('li');
    liColorInfoCurrColor.classList.add('current-color');
    ulColorInfo.append(liColorInfoCurrColor);

    const liColorInfoHex = document.createElement('li');
    liColorInfoHex.classList.add('hex');
    liColorInfoHex.innerHTML = 'HEX: <span></span>';
    ulColorInfo.append(liColorInfoHex);

    const liColorInfoRgb = document.createElement('li');
    liColorInfoRgb.classList.add('rgb');
    liColorInfoRgb.innerHTML = 'RGB: <span></span>';
    ulColorInfo.append(liColorInfoRgb);

    return modalDiv;
  }

  paletteModalListner(modelApp) {
    this.flag = '';
    const mC = document.querySelector('.modal-content');
    const hexCont = document.querySelector('.hex');
    const rgbCont = document.querySelector('.rgb');
    const curColor = document.querySelector('.current-color');

    const paletteCanvas = document.querySelector('#palettCnv');
    const ctxPalette = paletteCanvas.getContext('2d');

    const paletteImg = new Image();
    paletteImg.src = './img/palette.jpg';
    paletteImg.onload = () => {
      ctxPalette.drawImage(paletteImg, 0, 0);
    };

    const rgbToHex = (r, g, b) => `#${[r, g, b].map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }).join('')}`;

    const addColor = mC.querySelector('.add');
    const delColor = mC.querySelector('.palette-templates');

    const paletteManagerContainer = document.querySelector('.palette-manager .colors');

    function modalInit() {
      const modal = document.querySelector('.modal');
      const openModal = document.querySelector('.color-editor');
      const closeButton = modal.querySelector('.close-button');

      function toggleModal() {
        modal.classList.toggle('show-modal');
      }

      function windowOnClick(event) {
        if (event.target === modal) {
          toggleModal();
        }
      }

      openModal.addEventListener('click', toggleModal);
      closeButton.addEventListener('click', toggleModal);
      window.addEventListener('click', windowOnClick);
    }

    function paletteMouseMoveListner(e) {
      if (e.buttons > 0) {
        const x = e.clientX - (mC.offsetLeft - (mC.offsetWidth / 2) + e.target.offsetLeft);
        const y = e.clientY - (mC.offsetTop - (mC.offsetHeight / 2) + e.target.offsetTop);
        const imgd = ctxPalette.getImageData(x, y, 100, 100).data;
        const hexString = rgbToHex(imgd[0], imgd[1], imgd[2]);
        curColor.style.background = hexString;
        hexCont.children[0].innerText = hexString;
        rgbCont.children[0].innerText = `${imgd[0]}, ${imgd[2]}, ${imgd[3]}`;
      }
    }

    function paletteMouseUpListner(e) {
      if (e.buttons === 0) {
        const x = e.clientX - (mC.offsetLeft - (mC.offsetWidth / 2) + e.target.offsetLeft);
        const y = e.clientY - (mC.offsetTop - (mC.offsetHeight / 2) + e.target.offsetTop);
        const imgd = ctxPalette.getImageData(x, y, 1, 1).data;
        const hexString = rgbToHex(imgd[0], imgd[1], imgd[2]);
        hexCont.children[0].innerText = hexString;
        rgbCont.children[0].innerText = `${imgd[0]}, ${imgd[2]}, ${imgd[3]}`;
      }
    }

    function addColorListner(e) {
      const getColorTemplate = mC.querySelector('.template');
      const getColors = document.querySelector('.palette-templates');
      const toCfg = [];
      if (hexCont.querySelector('span').innerText !== '') {
        const cloneColorTemplate = getColorTemplate.cloneNode(true);
        cloneColorTemplate.style.display = '';
        cloneColorTemplate.style.backgroundColor = hexCont.querySelector('span').innerText;
        cloneColorTemplate.setAttribute('data-color', hexCont.querySelector('span').innerText);
        // getColorTemplate.parentNode.prepend(cloneColorTemplate);
        getColorTemplate.parentNode.insertBefore(cloneColorTemplate, e.target);

        const liPMContainer = document.createElement('li');
        liPMContainer.style.backgroundColor = hexCont.querySelector('span').innerText;
        liPMContainer.setAttribute('data-color', hexCont.querySelector('span').innerText);
        paletteManagerContainer.append(liPMContainer);
      }

      Object.values(getColors.children).forEach((color, index) => {
        if (index > 0 && index !== getColors.children.length - 1) {
          toCfg.push(color.getAttribute('data-color'));
        }
      });
      modelApp.setProperty('palettePresets', toCfg);
      global.console.log(modelApp.config);
    }

    function delColorListner(e) {
      const getColors = document.querySelector('.palette-templates');
      const toCfg = [];

      if (e.target.parentNode.hasAttribute('data-color')) {
        const dataAttrColor = e.target.parentNode.getAttribute('data-color');
        const getElPMforDel = paletteManagerContainer.querySelector(`li[data-color="${dataAttrColor}"]`);
        getElPMforDel.remove();
        e.target.parentNode.remove();

        Object.values(getColors.children).forEach((color, index) => {
          if (index > 0 && index !== getColors.children.length - 1) {
            toCfg.push(color.getAttribute('data-color'));
          }
        });
        modelApp.setProperty('palettePresets', toCfg);
      }
    }

    modalInit();

    delColor.addEventListener('click', delColorListner);
    addColor.addEventListener('click', addColorListner);
    paletteCanvas.addEventListener('mouseup', paletteMouseUpListner);
    paletteCanvas.addEventListener('mousemove', paletteMouseMoveListner);
  }

  canvasSizeListner(modelApp) {
    this.flag = '';
    const getCanvasSizes = document.querySelector('select.canvas-size');
    const sizeValue = modelApp.config.settings.canvasSize;
    global.console.log(sizeValue);
    const setValueOption = getCanvasSizes.querySelector(`option[value="${sizeValue}"]`);
    setValueOption.selected = 'selected';

    function canvasReinit() {
      const cfg = modelApp.config.settings;

      const canvas = document.getElementById(cfg.canvasId);
      const ctx = canvas.getContext('2d');

      const canvasAlt = document.getElementById(cfg.canvasIdAlt);
      const ctxAlt = canvasAlt.getContext('2d');

      ctx.lineWidth = cfg.width / cfg.canvasSize * cfg.penSize;
      ctx.lineHeight = cfg.width / cfg.canvasSize * cfg.penSize;

      ctxAlt.lineWidth = cfg.width / cfg.canvasSize * cfg.penSize;
      ctxAlt.lineHeight = cfg.width / cfg.canvasSize * cfg.penSize;
    }

    function canvasSizesChangeLstner(e) {
      modelApp.setProperty('canvasSize', e.target.value);
      canvasReinit();
    }
    getCanvasSizes.addEventListener('change', canvasSizesChangeLstner);
  }
}
