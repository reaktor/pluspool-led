import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import {getSampleAtTimestamp} from '../../helpers/data';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const Visualization = ({noaaData, stationData}) => {
  const noaaRange =
    noaaData && noaaData.length > 0
      ? [
          noaaData[0] && Date.parse(noaaData[0].t),
          noaaData[noaaData.length - 1] &&
            Date.parse(noaaData[noaaData.length - 1].t),
        ]
      : [null, null];

  const stationRange =
    stationData && stationData.samples && stationData.samples.length > 0
      ? [
          stationData.samples[0] && stationData.samples[0][0],
          stationData.samples[stationData.samples.length - 2] &&
            stationData.samples[stationData.samples.length - 2][0],
        ]
      : [null, null];

  const range = {
    max: Math.min(
      ...[Date.now(), stationRange[1], noaaRange[1]].filter(Boolean)
    ),
    min: Math.max(...[0, stationRange[0], noaaRange[0]].filter(Boolean)),
  };

  const [timestamp, setTimestamp] = useState();
  const [sample, setSample] = useState();

  const wrapper = useRef(null);
  const paperAnimation = useRef(null);

  useEffect(() => {
    if (!timestamp) return;
    setSample(
      getSampleAtTimestamp({
        noaaData,
        stationData,
        timestamp,
      })
    );
  }, [noaaData, stationData, timestamp]);

  const changeTimestamp = () => {
    setTimestamp(
      range.min + Math.floor(Math.random() * (range.max - range.min))
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
