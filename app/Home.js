'use client';

import React, { useState, useContext } from 'react';

import Databar from '../components/Databar';
import DataRangePicker from '../components/DataRangePicker';
import TitleText from '../components/TitleText';
import SvgVisualization from '../components/SvgVisualization';
import Tooltip from '../components/Tooltip';

import { useSample } from '../hooks/useSamples';
import { DataContext } from '../providers/DataProvider';

const Home = ({ sources, samples, units }) => {
  const data = useContext(DataContext);

  console.log(data);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipSlug, setTooltipSlug] = useState();

  const [sample, range, timestamp, setTimestamp] = useSample(samples);
  const [pageState, setPageState] = useState(0);

  const advanceIntro = () => pageState < 1 && setPageState(pageState + 1);

  const openTooltip = (slug) => {
    setTooltipSlug(slug);
    setTooltipOpen(true);
  };
  const closeTooltip = () => setTooltipOpen(false);

  return (
    <main className='page' data-template='index' data-page-state={pageState}>
      <Tooltip
        open={tooltipOpen}
        slug={tooltipSlug}
        sample={sample}
        closeTooltip={closeTooltip}
        sources={sources}
        units={units}
      />
      <TitleText
        timestamp={timestamp}
        sample={sample}
        pageState={pageState}
        onClick={advanceIntro}
      />
      <DataRangePicker
        setTimestamp={setTimestamp}
        timestamp={timestamp}
        range={range}
      />
      <Databar openTooltip={openTooltip} sample={sample} />
      <SvgVisualization sample={sample} />
    </main>
  );
};

export default Home;
