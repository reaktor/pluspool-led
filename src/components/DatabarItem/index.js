import React from 'react';

const DatabarItem = ({key, label, value, unit}) => (
    <div key={key} className="databar__item">
    <div className="databar__item__label">{label}</div>
    <div className="databar__item__value">
      {value}
      <span className="databar__item__unit">{unit}</span>
    </div>
  </div>
)

export default DatabarItem