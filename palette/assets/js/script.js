/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
// eslint-disable-next-line no-console
document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line camelcase
  let current_tool;
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
      // eslint-disable-next-line camelcase
      if (current_tool === 'choose-color') {
        e.target.classList.toggle('circle');
        // document.querySelector('body').click();
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

  document.addEventListener('mousedown', (e) => {
    // eslint-disable-next-line camelcase
    if (current_tool === 'move') {
      isDown = true;
      if (e.target.hasAttribute('figure')) {
        item = e.target;
        e.target.classList.add('leave');
        offset = [
          e.target.offsetLeft - e.clientX,
          e.target.offsetTop - e.clientY,
        ];
      }
    }
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
  });

  document.addEventListener('mousemove', (e) => {
    // eslint-disable-next-line camelcase
    if (current_tool === 'move') {
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
  });

  document.querySelector('body')
    .addEventListener('click', () => {
      // console.log('changed');
    });
});
