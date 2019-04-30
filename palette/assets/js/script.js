/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line camelcase
  let current_tool;

  // eslint-disable-next-line no-empty
  if (localStorage.getItem('cfg')) {
    const cfg = JSON.parse(localStorage.getItem('cfg'));
    cfg.forEach((item, index) => {
      if (index <= cfg.length - 2) {
        if (item[0] != null) {
          document.querySelector(`.canvas > div:nth-child(${index + 1}) .el`).setAttribute('style', item[0]);
        }
        if (item[1] != null) {
          document.querySelector(`.canvas > div:nth-child(${index + 1}) .el`).setAttribute('class', item[1]);
        }
        if (item[2] != null) {
          document.querySelector(`.canvas > div:nth-child(${index + 1}) .el`).setAttribute('figure', item[2]);
        }
      } else {
        document.querySelector('.current').setAttribute('data-color', item[0]);
        document.querySelector('.current span').style.backgroundColor = item[0];
        document.querySelector('.prev').setAttribute('data-color', item[1]);
        document.querySelector('.prev span').style.backgroundColor = item[1];
      }
    });
  }

  const tool = document.querySelector('.tools');
  // eslint-disable-next-line camelcase
  const select_color = document.querySelector('.select-color');

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 80) {
      // eslint-disable-next-line camelcase
      const tool_paint = document.querySelector('.paint');
      tool_paint.click();
      select_color.classList.add('disabled');
      // eslint-disable-next-line camelcase
      current_tool = 'paint';
    }

    if (e.keyCode === 67) {
      // eslint-disable-next-line camelcase
      const tool_color = document.querySelector('.choose-color');
      tool_color.click();
      select_color.classList.remove('disabled');
      // eslint-disable-next-line camelcase
      current_tool = 'choose-color';
    }

    if (e.keyCode === 77) {
      // eslint-disable-next-line camelcase
      const tool_move = document.querySelector('.move');
      tool_move.click();
      select_color.classList.add('disabled');
      // eslint-disable-next-line camelcase
      current_tool = 'move';
    }

    if (e.keyCode === 84) {
      // eslint-disable-next-line camelcase
      const tool_trans = document.querySelector('.transform');
      tool_trans.click();
      select_color.classList.add('disabled');
      // eslint-disable-next-line camelcase
      current_tool = 'transform';
    }
  });

  tool.addEventListener('click', (e) => {
    // eslint-disable-next-line camelcase
    current_tool = e.target.getAttribute('data-action');
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      document.body.removeAttribute('class');
      // eslint-disable-next-line camelcase
      current_tool = '';
    } else {
      Array.prototype.slice.call(document.querySelectorAll('.tools button'))
        .forEach((element) => {
          element.classList.remove('active');
        });

      // eslint-disable-next-line camelcase
      switch (current_tool) {
        case 'paint':
          document.body.setAttribute('class', 'buck');
          select_color.classList.add('disabled');
          break;
        case 'choose-color':
          document.body.setAttribute('class', 'picker');
          select_color.classList.remove('disabled');
          break;
        case 'move':
          document.body.setAttribute('class', 'move');
          select_color.classList.add('disabled');
          break;
        case 'transform':
          document.body.setAttribute('class', 'transform');
          select_color.classList.add('disabled');
          break;
        default:
      }
      e.target.classList.toggle('active');
    }
  });

  document.querySelector('.move').addEventListener('dblclick', (e) => {
    // eslint-disable-next-line camelcase

    if (e.target.classList.contains('active')) {
      e.target.innerText = 'Move';
      e.target.classList.remove('active');
      document.body.removeAttribute('class');
      document.body.setAttribute('class', 'move');
      // eslint-disable-next-line camelcase
      current_tool = 'move';
    } else {
      // eslint-disable-next-line camelcase
      current_tool = 'movegrid';
      e.target.classList.add('active');
      e.target.innerText = 'Move grid';
      document.body.setAttribute('class', 'movegrid');
      select_color.classList.add('disabled');
    }
  });

  const figures = document.querySelector('.canvas');

  figures.addEventListener('click', (e) => {
    if (e.target.hasAttribute('figure')) {
      // eslint-disable-next-line camelcase
      if (current_tool === 'paint') {
        e.target.classList.add('active');
        e.target.style.backgroundColor = document.querySelector('.current')
          .getAttribute('data-color');
      }
      // eslint-disable-next-line camelcase
      if (current_tool === 'transform') {
        e.target.classList.toggle('circle');
      }
    }
  });

  // eslint-disable-next-line camelcase
  const curr_color = document.querySelector('.current');

  // eslint-disable-next-line camelcase
  const prev_color = document.querySelector('.prev');

  prev_color.addEventListener('click', () => {
    let prev = prev_color.getAttribute('data-color');
    let curr = curr_color.getAttribute('data-color');

    // eslint-disable-next-line camelcase
    const curr_alt = curr;
    curr = prev;
    // eslint-disable-next-line camelcase
    prev = curr_alt;
    curr_color.setAttribute('data-color', curr);
    curr_color.children[0].style.backgroundColor = curr;
    prev_color.setAttribute('data-color', prev);
    prev_color.children[0].style.backgroundColor = prev;
  });

  curr_color.addEventListener('click', () => {
    let prev = prev_color.getAttribute('data-color');
    let curr = curr_color.getAttribute('data-color');

    // eslint-disable-next-line camelcase
    const curr_alt = curr;
    curr = prev;
    // eslint-disable-next-line camelcase
    prev = curr_alt;

    curr_color.setAttribute('data-color', curr);
    curr_color.children[0].style.backgroundColor = curr;
    prev_color.setAttribute('data-color', prev);
    prev_color.children[0].style.backgroundColor = prev;
  });

  select_color.addEventListener('click', (e) => {
    // eslint-disable-next-line camelcase
    if (current_tool === 'choose-color') {
      // eslint-disable-next-line vars-on-top
      let curr = document.querySelector('.current')
        .getAttribute('data-color');
      let prev = document.querySelector('.prev')
        .getAttribute('data-color');

      // eslint-disable-next-line camelcase
      const curr_alt = curr;
      curr = e.target.getAttribute('data-color');
      // eslint-disable-next-line camelcase
      prev = curr_alt;
      curr_color.setAttribute('data-color', curr);
      curr_color.children[0].style.backgroundColor = curr;
      prev_color.setAttribute('data-color', prev);
      prev_color.children[0].style.backgroundColor = prev;
    }
  });

  let isDown = false;
  let item = '';
  let offset = [0, 0];
  let mousePosition;
  const moovegrid = [];

  document.addEventListener('mousedown', (e) => {
    // eslint-disable-next-line camelcase
    if (current_tool === 'move') {
      if (e.target.hasAttribute('figure')) {
        isDown = true;
        item = e.target;
        e.target.classList.add('leave');
        offset = [
          e.target.offsetLeft - e.clientX,
          e.target.offsetTop - e.clientY,
        ];
      }
    }

    // eslint-disable-next-line camelcase
    if (current_tool === 'movegrid') {
      // eslint-disable-next-line no-empty
      moovegrid.length = 0;
      if (e.target.hasAttribute('figure')) {
        moovegrid.push(e.target.parentElement);
      } else {
        moovegrid.push(e.target);
      }
    }
  });

  function exchangeElements(el1, el2) {
    const clonedEl1 = el1.cloneNode(true);
    const clonedEl2 = el2.cloneNode(true);
    el2.parentNode.replaceChild(clonedEl1, el2);
    el1.parentNode.replaceChild(clonedEl2, el1);
    return clonedEl1;
  }

  document.addEventListener('mouseup', (e) => {
    isDown = false;
    // eslint-disable-next-line camelcase
    if (current_tool === 'movegrid') {
      // eslint-disable-next-line no-empty
      if (e.target.hasAttribute('figure')) {
        moovegrid.push(e.target.parentElement);
      } else {
        moovegrid.push(e.target);
      }
      // eslint-disable-next-line eqeqeq
      if (moovegrid.length == 2 && moovegrid[0] != moovegrid[1]) {
        exchangeElements(moovegrid[0], moovegrid[1]);
      }
      window.getSelection().empty();
    }
  });

  document.addEventListener('mousemove', (e) => {
    // eslint-disable-next-line camelcase
    if (current_tool === 'move' && isDown) {
      if (item.hasAttribute('figure')) {
        e.preventDefault();
        if (isDown) {
          mousePosition = {
            x: e.clientX,
            y: e.clientY,
          };
          item.style.left = `${mousePosition.x + offset[0]}px`;
          item.style.top = `${mousePosition.y + offset[1]}px`;
        }
      }
    }
  });

  window.addEventListener('unload', () => {
    const currClr = document.querySelector('.current').getAttribute('data-color');
    const prevClr = document.querySelector('.prev').getAttribute('data-color');
    const arr = [];
    Array.prototype.slice.call(document.querySelectorAll('.canvas .el')).forEach((element) => {
      arr.push([element.getAttribute('style'), element.getAttribute('class'), element.getAttribute('figure')]);
    });
    // eslint-disable-next-line camelcase
    arr.push([currClr, prevClr, current_tool]);
    localStorage.setItem('cfg', JSON.stringify(arr));
  });
});
