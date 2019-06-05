import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {labels, units} from '../../helpers/data';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

/**
 * A whitelist of headers we want to display in the Databar
 */
const displayedHeaders = [
  'Percent Oxygen_SDI_0_10_%',
  'Salinity_SDI_0_4_ppt',
  'Turbidity_SDI_0_8_NTU',
];

class Databar extends Component {
  static defaultProps = {
    changeData: () => {},
    className: '',
    sample: {},
  };

  render() {
    const {changeData, className, sample} = this.props;

    return (
      <div className={`${className} databar`}>
        {Object.keys(sample).map(column =>
          displayedHeaders.includes(column) ? (
            <div key={column} className="databar__item">
              <div className="databar__item__label">{labels[column]}</div>
              <div className="databar__item__value">
                {sample[column]}
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

Databar.propTypes = {
  changeData: PropTypes.func,
  className: PropTypes.string,
  sample: PropTypes.object,
};

export default Databar;
