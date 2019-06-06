import React, {Component} from 'react';
import datagarrison from 'datagarrison';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import {getSampleFromData, fetchDatagarrisonData} from '../../helpers/data';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

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
    fetchDatagarrisonData().then(text => {
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
  }

  componentDidUpdate(_prevProps, prevState) {
    const {stationData, sampleIndex} = this.state;

    if (sampleIndex !== prevState.sampleIndex) {
      const sample = getSampleFromData(stationData, sampleIndex);
      if (this.paperAnimation) this.paperAnimation.updateProps({sample});
    }
  }

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
          sample={getSampleFromData(stationData, sampleIndex)}
        />
      </div>
    );
  }
}

export default Visualization;
