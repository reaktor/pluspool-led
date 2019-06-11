import React from 'react';
import PropTypes from 'prop-types';
import {labels, units, transforms} from '../../helpers/data';
import DatabarItem from '../DatabarItem';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const displayedColumns = [
  'Percent Oxygen_SDI_0_10_%',
  'Salinity_SDI_0_4_ppt',
  'Turbidity_SDI_0_8_NTU',
  's',
  'd',
];

const Databar = ({changeSample, className, sample}) => {
  return (
    <div className={`${className} databar`}>
      {displayedColumns.map(
        column =>
          sample[column] && (
            <DatabarItem
              key={column}
              label={labels[column]}
              value={sample[column]}
              unit={units[column]}
              transform={transforms[column]}
            />
          )
      )}
      <button className="databar__button" type="button" onClick={changeSample}>
        Change data
      </button>
    </div>
  );
};

Databar.propTypes = {
  changeSample: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  sample: PropTypes.object,
};

Databar.defaultProps = {
  sample: {},
};

export default Databar;
