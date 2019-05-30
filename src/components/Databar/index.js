import React, {Component} from 'react';
import {labels, units} from '../../helpers/data';
import './index.css';

class Databar extends Component {
  render() {
    const {changeData, className, data} = this.props;

    return (
      <div className={`${className} databar`}>
        {Object.keys(data).map(key => (
          <div key={key} className="databar__item">
            <div className="databar__item__label">
              {labels[key]}
            </div>
            <div className="databar__item__value">
              {data[key]}{units[key]}
            </div>
          </div>
        ))}
        <button className="databar__button" type="button" onClick={changeData}>Change data</button>
      </div>
    );
  }
}

export default Databar;