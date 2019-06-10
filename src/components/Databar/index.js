import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {labels, units} from '../../helpers/data';
import DatabarItem from '../DatabarItem';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const Databar = ({changeSample, className, sample}) => {
  const [displayedColumns] = useState(Object.keys(sample));

  return (
    <div className={`${className} databar`}>
      {displayedColumns.map(column => (
        <DatabarItem
          key={column}
          label={labels[column]}
          value={sample[column]}
          unit={units[column]}
        />
      ))}
      <button className="databar__button" type="button" onClick={changeSample}>
        Change data
      </button>
    </div>
  );
};

Databar.propTypes = {
  changeSample: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  sample: PropTypes.object.isRequired,
};

export default Databar;
