export default class Configuration {
  constructor() {
    this.initial = {
      commonTools: [
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

    this.settings = {
      usingTool: '',
      penSize: 1,
      fastColors: ['#c71919', '#f4ebeb'],
      canvasId: 'drawCanvas',
      canvasIdAlt: 'drawCanvasAlt',
      color: '#c71919',
      width: 600,
      height: 600,
      canvasSize: 32,
      palettePresets: [
        '#dd0000',
        '#fe6230',
        '#fef600',
        '#00bb00',
        '#009bfe',
        '#000083',
        '#30009b',
        '#ffffff',
        '#000000',
      ],
    };

    this.frames = [];

    this.user = {
      authSession: '',
      gDriveKey: '',
      palettePresets: [],
    };
  }
}
