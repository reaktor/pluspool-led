import React from 'react';
import PropTypes from 'prop-types';
import {labels, units} from '../../helpers/data';
import DatabarItem from '../DatabarItem';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

/**
 * A whitelist of headers we want to display in the Databar
 */

const Databar = ({changeSample, className, sample}) => (
  <div className={`${className} databar`}>
    {Object.keys(sample).map(column => (
      <DatabarItem
        key={column}
        column={column}
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

Databar.propTypes = {
  changeSample: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  sample: PropTypes.object.isRequired,
};

export default Databar;
