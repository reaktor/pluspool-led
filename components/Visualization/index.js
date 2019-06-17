import React, {useState, useRef, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import {getSampleAtTimestamp} from '../../helpers/data';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const Visualization = ({noaaData, stationData}) => {
  const constrain = (range, by) => [
    Math.max(range[0], by[0]),
    Math.min(range[1], by[1])
  ]
  const [range, constrainRange] = useReducer(constrain, [0, Date.now()]);
  const [timestamp, setTimestamp] = useState(range[1]);
  const [sample, updateSample] = useReducer(getSampleAtTimestamp, {});

  // constrain the date range when we get new noaa data
  useEffect(() => {
    if (noaaData && noaaData.length > 0) {
      constrainRange([noaaData[0].t, noaaData[noaaData.length - 1].t].map(Date.parse))
    }
  }, [noaaData])

  // constrain the date range when we get new station data
  useEffect(() => {
    if (stationData && stationData.samples && stationData.samples.length > 1) {
      constrainRange([
        stationData.samples[0][0], stationData.samples[stationData.samples.length - 2][0]
      ])
    }
  }, [stationData])

  // make sure timestamp is within our range
  useEffect(() => {
    setTimestamp(timestamp => Math.min(Math.max(timestamp, range[0]), range[1]))
  }, [range])

  const wrapper = useRef(null);
  const paperAnimation = useRef(null);

  useEffect(() => {
    updateSample({
      noaaData,
      stationData,
      timestamp,
    })
  }, [noaaData, stationData, timestamp]);

  const changeTimestamp = () => {
    setTimestamp(
      range[0] + Math.floor(Math.random() * (range[1] - range[0]))
    );
  };

  const initPaperAnimation = () => {
    paperAnimation.current = new PaperAnimation({wrapper: wrapper.current});
  };

  const updatePaperAnimation = () => {
    paperAnimation.current.updateProps({sample});
  };

  useEffect(initPaperAnimation, []);
  useEffect(updatePaperAnimation, [paperAnimation, sample]);

  return (
    <div className="visualization">
      <div ref={wrapper} className="visualization__animation" />
      <Databar
        className="visualization__databar"
        changeSample={changeTimestamp}
        sample={sample}
      />
    </div>
  );
};

Visualization.defaultProps = {
  noaaData: null,
  stationData: null,
};

Visualization.propTypes = {
  noaaData: PropTypes.array,
  stationData: PropTypes.object,
};

export default Visualization;
