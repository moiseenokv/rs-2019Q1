export default class Canvas {
  constructor() {
    this.data = '';
    this.flag = '';
    this.canvas = '';
  }

  mainCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'drawCanvas';
    this.canvas.width = 600;
    this.canvas.height = 600;
    return this.canvas;
  }

  mainCanvasInit(modelApp) {
    this.flag = '';
    const canvas = document.getElementById(modelApp.id);
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = modelApp.ctx.color;
    ctx.lineCap = 'square';
    ctx.lineWidth = modelApp.ctx.width;
    ctx.lineHeight = modelApp.ctx.height;

    const coordCont = document.querySelector('.coord');

    function getMousePos(canv, evt) {
      const rect = canv.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }

    function mouseMoveListner(e) {
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
      const mousePos = getMousePos(canvas, e);
      coordCont.firstElementChild.innerText = parseInt(mousePos.x, 10);
      coordCont.lastElementChild.innerText = parseInt(mousePos.y, 10);
    }

    function mouseUpListner() {
      const frameActiveImg = document.querySelector('.frame.active > img');
      frameActiveImg.src = canvas.toDataURL();
      frameActiveImg.classList.remove('hidden');
    }

    canvas.addEventListener('mousemove', mouseMoveListner);
    canvas.addEventListener('mouseup', mouseUpListner);
  }
}
