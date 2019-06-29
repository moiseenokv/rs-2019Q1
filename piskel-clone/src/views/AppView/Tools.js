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
    this.divPenSizes.classList.add(data.parentClass);
    const elem = data.elements;
    elem.forEach((cls, index) => {
      const sizeSpan = document.createElement('span');
      sizeSpan.classList.add(cls);
      if (index === elem.length - 1) {
        sizeSpan.classList.add('active');
      }
      this.divPenSizes.append(sizeSpan);
    });

    return this.divPenSizes;
  }

  generateTools(obj) {
    obj.cont.classList.add(obj.className);
    obj.data.forEach((tool) => {
      const li = document.createElement('li');
      if (tool.hotKey[0] !== 'none') {
        li.classList.add('tool');
      }
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
    getToolCont.addEventListener('click', (event) => {
      global.console.log(modelApp.data.current);
      // global.console.log(event.target);

      // working with tools
      if (event.target.classList.contains('tool')) {
        modelApp.setProperty('tool', event.target.classList[1]);
        const getActive = getToolCont.querySelector('.tool.active');
        if (getActive) getActive.classList.remove('active');
        event.target.classList.add('active');
      }

      // working with pen-size block

      if (event.target.parentNode.classList.contains('pen-size')) {
        const penSize = event.target;
        modelApp.setProperty('penSize', penSize.classList[0].slice(5, -1));
        const getActive = getToolCont.querySelector('.pen-size > .active');
        if (getActive) getActive.classList.remove('active');
        penSize.classList.add('active');
      }

      // working with fast-colors block
      if (event.target.parentNode.classList.contains('fast-colors')) {
        if (event.target.classList.contains('primary') || event.target.classList.contains('secondary')) {
          const getParent = event.target.parentNode;
          const tempColor = getParent.childNodes[0].style.background;
          getParent.childNodes[0].style.background = getParent.childNodes[1].style.background;
          getParent.childNodes[1].style.background = tempColor;
          modelApp.setProperty('fastColors', [getParent.childNodes[0].style.background, getParent.childNodes[1].style.background]);
        }
      }
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

  static generatePaletteTool() {
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

    return divPalette;
  }

  static generatePaletteModal() {

  }
}
