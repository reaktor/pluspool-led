import React, {Component} from 'react';
import {labels, units} from '../../helpers/data';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const displayedHeaders = [
  'Percent Oxygen_SDI_0_10_%',
  'Salinity_SDI_0_4_ppt',
  'Turbidity_SDI_0_8_NTU',
];

class Databar extends Component {
  render() {
    const {changeData, className, stationData, sampleIndex} = this.props;

    if (!stationData || !stationData.samples || !sampleIndex) {
      return null;
    }

    const {samples, header} = stationData;
    const sample = samples[sampleIndex];

    return (
      <div className={`${className} databar`}>
        {header.map((column, index) =>
          displayedHeaders.includes(column) ? (
            <div key={column} className="databar__item">
              <div className="databar__item__label">{labels[column]}</div>
              <div className="databar__item__value">
                {sample[index]}
                <span className="databar__item__unit">{units[column]}</span>
              </div>
            </div>
          ) : null
        )}
        <button className="databar__button" type="button" onClick={changeData}>
          Change data
        </button>
      </div>
    );
  }
}

export default Databar;
