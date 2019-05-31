import React, {Component} from 'react';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const dummyData = [
  {
    oxygen: 90,
    bacteria: 'high',
  },
  {
    oxygen: 20,
    bacteria: 'high',
  },
  {
    oxygen: 80,
    bacteria: 'low',
  },
  {
    oxygen: 50,
    bacteria: 'low',
  },
];

const randomData = () => {
  const random = Math.floor(Math.random() * dummyData.length);
  const data = dummyData[random];
  return data;
};

class Visualization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: randomData(),
    };

    this.paperAnimation = null;

    // Wrapper ref to inject canvas into
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    const {data} = this.state;
    const wrapper = this.wrapper.current;

    this.paperAnimation = new PaperAnimation({wrapper, data});
  }

  componentDidUpdate(_prevProps, prevState) {
    const {data} = this.state;

    if (
      data.bacteria !== prevState.data.bacteria ||
      data.oxygen !== prevState.data.oxygen
    ) {
      this.paperAnimation.updateProps({data});
    }
  }

  /**
   * This is a temporary function to mimic data updating
   */
  changeData = () => {
    this.setState({
      data: randomData(),
    });
  };

  render() {
    const {data} = this.state;

    return (
      <div className="visualization">
        <div ref={this.wrapper} className="visualization__animation" />
        <Databar
          className="visualization__databar"
          changeData={this.changeData}
          data={data}
        />
      </div>
    );
  }
}

export default Visualization;
