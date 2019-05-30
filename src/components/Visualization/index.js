import React, {Component} from 'react';
import PaperAnimation from '../PaperAnimation';
import './index.css';

class Visualization extends Component {
  constructor(props) {
    super(props);

    // Wrapper ref to inject canvas into
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    const wrapper = this.wrapper.current;
    new PaperAnimation({ wrapper });
  }

  render() {
    return (
      <div className="Visualization" ref={this.wrapper} />
    );
  }
}

export default Visualization;