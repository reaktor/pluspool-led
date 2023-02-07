'use client';

import React, { useState } from 'react';
import { useSample } from './hooks/useSamples';

export default async function Index() {
  const [state, setState] = useState({ data: null });

  useEffect(() => {
    dataFetchProcess.start((data) => setState({ data }));
  }, [setState]); // conform to React exhaustive-deps

  const [sample, range, timestamp, setTimestamp] = useSample(samples);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipSlug, setTooltipSlug] = useState();
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
}
