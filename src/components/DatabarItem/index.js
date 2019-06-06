import React from 'react';
import PropTypes from 'prop-types';

const DatabarItem = ({column, label, value, unit}) => (
  <div key={column} className="databar__item">
    <div className="databar__item__label">{label}</div>
    <div className="databar__item__value">
      {value}
      <span className="databar__item__unit">{unit}</span>
    </div>
  </div>
);

DatabarItem.propTypes = {
  column: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default DatabarItem;
