import React from 'react';
import PropTypes from 'prop-types';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const DatabarItem = ({label, value, unit}) => (
  <div className="databar__item">
    <div className="databar__item__label">{label}</div>
    <div className="databar__item__value">
      {value}
      <span className="databar__item__unit">{unit}</span>
    </div>
  </div>
);

DatabarItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default DatabarItem;
