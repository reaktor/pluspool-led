import paper from 'paper-jsdom-canvas';

const icons = {
  bacteria: '/static/img/icons/bacteria.svg',
  direction: '/static/img/icons/direction.svg',
  oxygen: '/static/img/icons/oxygen.svg',
  salinity: '/static/img/icons/salinity.svg',
  speed: '/static/img/icons/speed.svg',
  turbidity: '/static/img/icons/turbidity.svg',
};

class IconAnimation {
  constructor(props) {
    const {sample} = props;
    this.sample = sample;
    this.iconSymbols = {
      bacteria: null,
      direction: null,
      oxygen: null,
      salinity: null,
      speed: null,
      turbidity: null,
    };
    this.layers = [null];
  }

  updateProps ({ sample }) {
    this.sample = sample
  }

  draw () {
    const { width } = paper.view.size
    const { center } = paper.view

    Object.keys(icons).map((key, index) => {
      const iconPath = icons[key];
      paper.project.importSVG(iconPath, icon => {
        icon.position = new paper.Point(40 * index, 0);
      });
    });
  }

  animate(event) {
  }
}

export default IconAnimation
