import paper from 'paper';
import PoolAnimation from './PoolAnimation';
import WaveAnimation from './WaveAnimation';

class PaperAnimation {
  constructor(props) {
    const {wrapper, sample = {}} = props;
    paper.settings.applyMatrix = false;

    this.wrapper = wrapper;
    this.sample = sample;

    this.water = new WaveAnimation({sample});
    this.pool = new PoolAnimation({sample});

    this.initializeCanvas();
    this.initializeLayers();
    this.water.draw();
    this.pool.draw();

    paper.view.onFrame = this.onFrame.bind(this);
  }

  updateProps({sample}) {
    this.sample = sample;

    this.water.updateProps({sample});
    this.pool.updateProps({sample});
  }

  onFrame(event) {
    this.water.animate(event);
    this.pool.animate(event);
  }

  initializeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'paper-canvas';
    if (this.wrapper) this.wrapper.append(canvas);
    paper.setup(canvas);

    const {height, width} = paper.view.size;

    // Shift our global vertical center to be the middle
    paper.view.translate([width / 2, height / 2]);
  }

  initializeLayers() {
    this.water.layers[0] = new paper.Group();
    this.water.layers[1] = new paper.Group();
    this.water.layers[1].translate(new paper.Point(10, 10));

    this.pool.layers[0] = new paper.Group();

    this.pool.layers[0].sendToBack();
    this.water.layers[0].sendToBack();
  }
}

export default PaperAnimation;
