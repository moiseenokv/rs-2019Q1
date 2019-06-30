export default class Canvas {
  constructor() {
    this.data = '';
    this.flag = '';
    this.canvas = '';
    this.ctx = '';
    this.canvasAlt = '';
    this.ctx = '';
  }

  mainCanvas(modelApp) {
    this.flag = '';
    const cfg = modelApp.config.settings;
    const canvas = document.createElement('canvas');
    canvas.id = cfg.canvasId;
    canvas.width = cfg.width;
    canvas.height = cfg.height;
    return canvas;
  }

  altCanvas(modelApp) {
    this.flag = '';
    const cfg = modelApp.config.settings;
    const canvasAlt = document.createElement('canvas');
    canvasAlt.id = cfg.canvasIdAlt;
    canvasAlt.width = cfg.width;
    canvasAlt.height = cfg.height;
    return canvasAlt;
  }

  mainCanvasInit(modelApp) {
    this.flag = '';
    const cfg = modelApp.config.settings;
    const canvas = document.getElementById(cfg.canvasId);
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = cfg.color;
    ctx.lineCap = 'square';
    ctx.lineWidth = cfg.width / cfg.canvasSize * cfg.penSize;
    ctx.lineHeight = cfg.width / cfg.canvasSize * cfg.penSize;

    const canvasAlt = document.getElementById(cfg.canvasIdAlt);
    const ctxAlt = canvasAlt.getContext('2d');
    ctxAlt.strokeStyle = cfg.color;
    ctxAlt.lineCap = 'square';
    ctxAlt.lineWidth = cfg.width / cfg.canvasSize * cfg.penSize;
    ctxAlt.lineHeight = cfg.width / cfg.canvasSize * cfg.penSize;

    const coordCont = document.querySelector('.coord');
    const frameActiveImg = document.querySelector('.frame.active > img');
    if (frameActiveImg) ctx.drawImage(frameActiveImg, 0, 0, canvas.width, canvas.height);


    let lastMousex = '';
    let lastMousey = '';

    function getMousePos(canv, evt) {
      const rect = canv.getBoundingClientRect();
      coordCont.firstElementChild.innerText = parseInt((evt.clientX - rect.left), 10);
      coordCont.lastElementChild.innerText = parseInt((evt.clientY - rect.top), 10);
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }

    function saveFrames() {
      const framesContainer = document.querySelector('.frames');
      const getImages = framesContainer.getElementsByTagName('img');
      const imgSrcs = [];
      Object.values(getImages).forEach((img) => {
        if (!img.classList.contains('hidden')) {
          imgSrcs.push(img.src);
        }
      });
      modelApp.saveFrames(imgSrcs);
    }

    function mouseMoveListner(e) {
      const x = e.offsetX;
      const y = e.offsetY;
      const dx = e.movementX;
      const dy = e.movementY;

      getMousePos(canvas, e);


      if (cfg.usingTool === 'pen' && e.buttons > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - dx, y - dy);
        ctx.stroke();
        ctx.closePath();
      }

      if (cfg.usingTool === 'erase' && e.buttons > 0) {
        global.console.log('erase');
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(255,0,0,0)';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - dx, y - dy);
        ctx.stroke();
        ctx.closePath();
      }

      if (cfg.usingTool === 'rect' && e.buttons > 0) {
        ctxAlt.clearRect(0, 0, canvas.width, canvas.height);
        ctxAlt.beginPath();
        ctxAlt.rect(lastMousex, lastMousey, x - lastMousex, y - lastMousey);
        ctxAlt.stroke();
        ctxAlt.closePath();
      }

      if (cfg.usingTool === 'circle' && e.buttons > 0) {
        const mouseX = parseInt(e.clientX - x, 10);
        const mouseY = parseInt(e.clientY - y, 10);
        ctxAlt.clearRect(0, 0, canvas.width, canvas.height);
        ctxAlt.save();
        ctxAlt.beginPath();
        const scaleX = 1 * ((mouseX - lastMousex) / 2);
        const scaleY = 1 * ((mouseY - lastMousey) / 2);
        ctxAlt.scale(scaleX, scaleY);
        const centerX = (lastMousex / scaleX) + 1;
        const centerY = (lastMousey / scaleY) + 1;
        ctxAlt.arc(centerX, centerY, 1, 0, 2 * Math.PI);
        ctxAlt.restore();
        ctxAlt.stroke();
        ctxAlt.closePath();
      }

      if (cfg.usingTool === 'stroke' && e.buttons > 0) {
        ctxAlt.clearRect(0, 0, canvas.width, canvas.height);
        ctxAlt.beginPath();

        ctxAlt.moveTo(lastMousex, lastMousey);
        ctxAlt.lineTo(e.offsetX, e.offsetY);
        ctxAlt.stroke();
        ctxAlt.closePath();
      }
    }

    function mouseUpListner() {
      const tempImg = document.querySelector('.draw > img');
      tempImg.src = canvasAlt.toDataURL();
      ctx.drawImage(canvasAlt, 0, 0, canvas.width, canvas.height);
      ctxAlt.clearRect(0, 0, canvas.width, canvas.height);
      frameActiveImg.src = canvas.toDataURL();
      frameActiveImg.classList.remove('hidden');
      saveFrames();
    }

    function mouseDownListner(e) {
      if (cfg.usingTool === 'rect' && e.buttons > 0) {
        lastMousex = e.offsetX;
        lastMousey = e.offsetY;
      }

      if (cfg.usingTool === 'circle' && e.buttons > 0) {
        lastMousex = e.offsetX;
        lastMousey = e.offsetY;
      }

      if (cfg.usingTool === 'stroke' && e.buttons > 0) {
        // eslint-disable-next-line max-len
        global.console.log(e.offsetX, e.offsetY);
        lastMousex = e.offsetX;
        lastMousey = e.offsetY;
      }
    }

    function mouseLeaveListner() {
      coordCont.firstElementChild.innerText = 0;
      coordCont.lastElementChild.innerText = 0;
    }

    canvas.addEventListener('mouseleave', mouseLeaveListner);
    canvas.addEventListener('mousedown', mouseDownListner);
    canvas.addEventListener('mousemove', mouseMoveListner);
    canvas.addEventListener('mouseup', mouseUpListner);
  }
}
