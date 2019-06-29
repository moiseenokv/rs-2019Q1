export default class Configuration {
  constructor() {
    this.object = {
      tools: [
        {
          title: 'Pen',
          class: 'pen',
          hotKey: ['P', 'Pen tool'],
        },
        {
          title: 'Vertical mirror pen',
          class: 'mirror-pen',
          hotKey: ['V', 'Vertical mirror pen'],
        },
        {
          title: 'Paint bucket tool',
          class: 'bucket',
          hotKey: ['B', 'Paint bucket tool'],
        },
        {
          title: 'Paint all pixels of the same color',
          class: 'paintall',
          hotKey: ['A', 'Paint all pixels of the same color'],
        },
        {
          title: 'Erase tool',
          class: 'erase',
          hotKey: ['E', 'Erase tool'],
        },
        {
          title: 'Stroke tool',
          class: 'stroke',
          hotKey: ['L', 'Stroke tool'],
        },
        {
          title: 'Rectangle tool',
          class: 'rect',
          hotKey: ['R', 'Rectangle tool'],
        },
        {
          title: 'Circle tool',
          class: 'circle',
          hotKey: ['C', 'Circle tool'],
        },
        {
          title: 'Move tool',
          class: 'move',
          hotKey: ['M', 'Move tool'],
        },
        {
          title: 'Shape selection',
          class: 'select',
          hotKey: ['Z', 'Shape selection'],
        },
        {
          title: 'Rectangle selection',
          class: 'rect-select',
          hotKey: ['S', 'Rectangle selection'],
        },
        {
          title: 'Lasso selection',
          class: 'lasso-select',
          hotKey: ['H', 'Lasso selection'],
        },
        {
          title: 'Color Picker',
          class: 'color-pick',
          hotKey: ['O', 'Color picker tool'],
        },
      ],
      penSizes: {
        parentClass: 'pen-size',
        elements: [
          'size-1x',
          'size-2x',
          'size-3x',
          'size-4x',
        ],
      },
      colorSelect: ['#c71919', '#f4ebeb'],
      transformTools: [
        {
          title: 'FLip',
          class: 'flip',
          hotKey: ['none', 'FLip'],
        },
        {
          title: 'Rotate',
          class: 'rotate',
          hotKey: ['none', 'Rotate'],
        },
        {
          title: 'Clone',
          class: 'clone',
          hotKey: ['none', 'Clone'],
        },
        {
          title: 'Align image to the center',
          class: 'center',
          hotKey: ['none', 'Align image to the center'],
        },
      ],
    };
    this.current = {
      tool: '1',
      penSize: '',
      fastColors: [],
      frames: [],
      drawCanvas: {
        id: 'drawCanvas',
        ctx: {
          color: '#c71919',
          width: 18.75,
          height: 18.75,
        },
      },
    };
  }
}
