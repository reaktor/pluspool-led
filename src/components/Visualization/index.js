import React, {Component} from 'react';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import './index.css';

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

    // Wrapper ref to inject canvas into
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    const wrapper = this.wrapper.current;
    new PaperAnimation({ wrapper });
  }

  /**
   * This is a temporary function to mimic data updating
   */
  changeData = () => {
    this.setState({
      data: randomData(),
    });
  }

  render() {
    const {data} = this.state;

    return (
      <div className="visualization">
        <div className="visualization__animation" ref={this.wrapper} />
        <Databar className="visualization__databar" changeData={this.changeData} data={data} />
      </div>
    );
  }
}

export default Visualization;