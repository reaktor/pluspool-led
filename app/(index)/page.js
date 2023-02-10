'use client';

import React, { useState } from 'react';

import Databar from '../../components/Databar';
import DataRangePicker from '../../components/DataRangePicker';
import TitleText from '../../components/TitleText';
import SvgVisualization from '../../components/SvgVisualization';
import Tooltip from '../../components/Tooltip';

import { useSample } from '../../hooks/useSamples';
import { useDataContext } from '../../providers/DataProvider';

const Dashboard = () => {
  const { samples, sources, units } = useDataContext();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipSlug, setTooltipSlug] = useState();

  const [sample, range, timestamp, setTimestamp] = useSample(samples);
  const [showBanner, setShowBanner] = useState(true);

  const hideBanner = () => setShowBanner(false);

  const openTooltip = (slug) => {
    setTooltipSlug(slug);
    setTooltipOpen(true);
  };
  const closeTooltip = () => setTooltipOpen(false);

  return (
    <main className='page' data-template='index' data-show-banner={showBanner}>
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
        showBanner={showBanner}
        onClick={hideBanner}
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

export default Dashboard;
