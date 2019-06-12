import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import {deriveSampleFromData} from '../../helpers/data';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const Visualization = ({noaaData, stationData}) => {
  const [stationSampleIndex, setStationSampleIndex] = useState();
  const [noaaSampleIndex, setNoaaSampleIndex] = useState();
  const wrapper = useRef(null);
  const paperAnimation = useRef(null);

  const sample = deriveSampleFromData({
    noaaData,
    stationData,
    stationSampleIndex,
    noaaSampleIndex,
  });

  const initPaperAnimation = () => {
    paperAnimation.current = new PaperAnimation({wrapper: wrapper.current});
  };

  const updatePaperAnimation = () => {
    paperAnimation.current.updateProps({sample});
  };

  const setStationSampleIndexToLatest = () => {
    setStationSampleIndex(stationData && stationData.samples.length - 2);
  };

  const setNoaaSampleIndexToLatest = () => {
    setNoaaSampleIndex(noaaData && noaaData.length - 1);
  };

  const changeStationSampleIndex = () => {
    if (!stationData) return;
    setStationSampleIndex(
      Math.floor(Math.random() * (stationData.samples.length - 2))
    );
  };

  const changeNoaaSampleIndex = () => {
    if (!noaaData) return;
    setNoaaSampleIndex(Math.floor(Math.random() * (noaaData.length - 1)));
  };

  const changeSampleIndex = () => {
    changeStationSampleIndex();
    changeNoaaSampleIndex();
  };

  useEffect(initPaperAnimation, []);

  useEffect(updatePaperAnimation, [paperAnimation, sample]);

  useEffect(setStationSampleIndexToLatest, [stationData]);
  useEffect(setNoaaSampleIndexToLatest, [noaaData]);

  return (
    <div className="visualization">
      <div ref={wrapper} className="visualization__animation" />
      <Databar
        className="visualization__databar"
        changeSample={changeSampleIndex}
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
