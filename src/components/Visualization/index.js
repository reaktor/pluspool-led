import React, {Component} from 'react';
import datagarrison from 'datagarrison';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const getSampleFromData = (data, index) => {
  if (data && data.samples) {
    const sample = data.samples[index];
    return data.header.reduce((acc, column, i) => {
      acc[column] = sample[i];
      return acc;
    }, {});
  }
};

class Visualization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stationData: {},
      sampleIndex: 0,
    };

    this.paperAnimation = null;

    // Wrapper ref to inject canvas into
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    fetch('/data/351579054854805_live.txt', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
    }).then(response => {
      response.text().then(text => {
        const parsedData = datagarrison.parse(text);
        const latestSampleIndex = parsedData.samples.length - 2;

        this.setState(
          {
            stationData: parsedData,
            sampleIndex: latestSampleIndex,
          },
          () => {
            const {stationData, sampleIndex} = this.state;
            const wrapper = this.wrapper.current;
            const sample = getSampleFromData(stationData, sampleIndex);
            this.paperAnimation = new PaperAnimation({wrapper, sample});
          }
        );
      });
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const {stationData, sampleIndex} = this.state;

    if (sampleIndex !== prevState.sampleIndex) {
      const sample = getSampleFromData(stationData, sampleIndex);
      if (this.paperAnimation) this.paperAnimation.updateProps({sample});
    }
  }

  /**
   * This is a temporary function to mimic data updating
   */
  changeSampleIndex = () => {
    const {stationData} = this.state;

    this.setState({
      sampleIndex: Math.floor(Math.random() * (stationData.samples.length - 2)),
    });
  };

  render() {
    const {stationData, sampleIndex} = this.state;

    return (
      <div className="visualization">
        <div ref={this.wrapper} className="visualization__animation" />
        <Databar
          className="visualization__databar"
          changeData={this.changeSampleIndex}
          stationData={stationData}
          sampleIndex={sampleIndex}
        />
      </div>
    );
  }
}

export default Visualization;
