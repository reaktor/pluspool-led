import React, {Component} from 'react';
// import {paper} from 'paper';
import './index.css';

import {
  View,
  Layer,
  Group,
  Path,
  Circle,
  Ellipse,
  Rectangle,
  PointText,
  Tool,
  Line,
} from 'react-paper-bindings';

class Visualization extends Component {
  state = {
    wrapperBox: {},
  };

  constructor(props) {
    super(props);

    this.setPaperRef = element => {
      const box = element.getBoundingClientRect();
      const {x, y, width, height} = box;

      this.setState({
        wrapperBox: {
          x,
          y,
          width,
          height,
        }
      });
      return;
    }
  }

  render() {
    const {wrapperBox} = this.state;

    return (
      <div className="Visualization" ref={this.setPaperRef}>
        <View width={wrapperBox.width} height={wrapperBox.height}>
          <Path />
          <Line from={10} to={40} strokeColor="black" />
          <Ellipse
            center={[50, 50]}
            size={[25, 25]}
            strokeWidth={2.5}
            strokeColor={'#61DAFB'}
          />
        </View>
      </div>
    );
  }
}

export default Visualization;