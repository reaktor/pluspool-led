import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { before, cutData, downsampleData, formAxisSeries, formXSeries } from '../../helpers/data';
import content from '../../content'
import Graph from '../Graph'
import GraphsDateFilter from '../GraphsDateFilter'
import DownloadData from '../DownloadData'
import styles from './Graphs.module.css';
import DataDisclaimer from '../DataDisclaimer';

const maxResolution = 1000; // points

const timeUnits = ['day', 'week', 'month', 'year'];

const dsColumns = Array.from(Object.keys(content.dataPoints))

const Graphs = ({ openTooltip, samples, units }) => {
  const [activeUnit, setActiveUnit] = useState('day')
  const latestSampleTimestamp = samples[samples.length -1].noaaTime

  const [domain, setDomain] = useState([latestSampleTimestamp, before(activeUnit, latestSampleTimestamp)])
  const [overlayGraph, setOverlayGraph] = useState(null)

  const dsSamplesData = useRef([])
  const setSpan = unit => setDomain([latestSampleTimestamp, before(unit, latestSampleTimestamp)])
  const filterOnClick = unit => {
    setActiveUnit(unit)
    setSpan(unit)
  }

  const [max, min] = domain

  const domainSamples = cutData(samples, 'noaaTime', min, max)
  const dsSamples = downsampleData(domainSamples, 'noaaTime', dsColumns, maxResolution)
  dsSamplesData.current = dsSamples;

  const xSeries = useMemo(() => {
    // console.log('running xSeries')
    const labels = formAxisSeries(dsSamplesData.current, 'noaaTime')
    return labels
    //eslint-disable-next-line
  }, [min]); //only rerun when the minimum value changes from the date filter, otherwise don't compute. false positive eslint warning about removing the min from dependency arr

  if (!samples) return null;

  const graphProps = (key) => ({
    x: 'noaaTime',
    y: content.dataPoints[key].slug,
    domain: domain,
    data: dsSamples,
    unit: units[content.dataPoints[key].slug],
    ...content.dataPoints[key],
  });

  const graphs = dsColumns.map((key) => (
    <Graph
      key={key}
      setOverlayGraph={setOverlayGraph}
      openTooltip={openTooltip}
      graph={graphProps(key)}
      xSeries={xSeries}
      units={units}
      overlayGraph={overlayGraph && graphProps(overlayGraph)}
    />
  ));

  return (
    <>
      <div className={styles.topBar}>
        <GraphsDateFilter
          units={timeUnits}
          activeUnit={activeUnit}
          onChange={filterOnClick}
          name='span'
        />
        <DownloadData />
        <DataDisclaimer />
      </div>
      <div className={styles.container}>{graphs}</div>
    </>
  );
};

Graphs.defaultProps = {
  samples: null
}

Graphs.propTypes = {
  samples: PropTypes.array
}

export default Graphs
