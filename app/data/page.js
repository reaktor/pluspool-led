'use client';

import React, { useState } from 'react';
import Graphs from '../../components/Graphs';
import Tooltip from '../../components/Tooltip';
import { useDataContext } from '../../providers/DataProvider';

const Data = () => {
  const { samples, sources, units } = useDataContext();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipSlug, setTooltipSlug] = useState(null);

  const openTooltip = (slug) => {
    setTooltipSlug(slug);
    setTooltipOpen(true);
  };

  const closeTooltip = () => setTooltipOpen(false);

  return (
    <main className='page' data-template='data'>
      <Tooltip
        open={tooltipOpen}
        slug={tooltipSlug}
        closeTooltip={closeTooltip}
        sources={sources}
        units={units}
      />
      <div className='page__body'>
        <Graphs openTooltip={openTooltip} samples={samples} units={units} />
      </div>
    </main>
  );
};

Data.displayName = 'Data';

export default Data;
