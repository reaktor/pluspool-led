import React, {useState, useRef, useEffect} from 'react';
import datagarrison from 'datagarrison';
import Databar from '../Databar';
import PaperAnimation from '../PaperAnimation';
import {getSampleFromData, fetchDatagarrisonData} from '../../helpers/data';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const Visualization = () => {
  const [stationData, setStationData] = useState();
  const [sampleIndex, setSampleIndex] = useState();
  const wrapper = useRef(null);
  const paperAnimation = useRef(null);

  const sample = getSampleFromData(stationData, sampleIndex);

  const initPaperAnimation = () => {
    paperAnimation.current = new PaperAnimation({wrapper: wrapper.current});
  };

  const updatePaperAnimation = () => {
    paperAnimation.current.updateProps({sample});
  };

  const fetchStationData = () => {
    fetchDatagarrisonData().then(text =>
      setStationData(datagarrison.parse(text))
    );
  };

  const setSampleIndexToLatest = () => {
    setSampleIndex(stationData && stationData.samples.length - 2);
  };

  const changeSampleIndex = () => {
    if (!stationData) return;
    setSampleIndex(
      Math.floor(Math.random() * (stationData.samples.length - 2))
    );
  };

  useEffect(initPaperAnimation, []);

  useEffect(updatePaperAnimation, [paperAnimation, sample]);

  useEffect(fetchStationData, []);

  useEffect(setSampleIndexToLatest, [stationData]);

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

export default Visualization;
