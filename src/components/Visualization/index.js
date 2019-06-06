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

  useEffect(() => {
    paperAnimation.current = new PaperAnimation({
      wrapper: wrapper.current,
    });
  }, []);

  useEffect(() => {
    paperAnimation.current.updateProps({sample});
  }, [paperAnimation, sample]);

  const changeSampleIndex = () => {
    if (!stationData) return;
    setSampleIndex(
      Math.floor(Math.random() * (stationData.samples.length - 2))
    );
  };

  const setLatestSampleIndex = () => {
    if (!stationData) return;
    setSampleIndex(stationData.samples.length - 2);
  };

  useEffect(() => {
    fetchDatagarrisonData()
      .then(text => setStationData(datagarrison.parse(text)));
  }, []);

  useEffect(setLatestSampleIndex, [stationData]);

  if (!(sample && wrapper)) return null;

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
