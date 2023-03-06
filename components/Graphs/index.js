import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { before, cutData, downsampleData, formAxesSeries } from '../../helpers/data';
import content from '../../content'
import Graph from '../Graph'
import GraphsDateFilter from '../GraphsDateFilter'
import DownloadData from '../DownloadData'
import styles from './Graphs.module.css';
import DataDisclaimer from '../DataDisclaimer';
import { DATE_UNITS } from '../../helpers/constants';

//Import ChartJs and register all the plugins necessary for our usage
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);


const maxResolution = 1000; // points

const timeUnits = [DATE_UNITS.DAY, DATE_UNITS.WEEK, DATE_UNITS.MONTH, DATE_UNITS.YEAR]

const dsColumns = Array.from(Object.keys(content.dataPoints))

const Graphs = ({ openTooltip, samples, units }) => {
  const [activeUnit, setActiveUnit] = useState(DATE_UNITS.WEEK)
  const latestSampleTimestamp = samples[samples.length -1].noaaTime

  const [domain, setDomain] = useState([latestSampleTimestamp, before(activeUnit, latestSampleTimestamp)])
  const [overlayGraph, setOverlayGraph] = useState(null)

  const setSpan = unit => setDomain([latestSampleTimestamp, before(unit, latestSampleTimestamp)])
  const filterOnClick = unit => {
    setActiveUnit(unit)
    setSpan(unit)
  }

  const [max, min] = domain

  const domainSamples = cutData(samples, 'noaaTime', min, max)
  const dsSamples = downsampleData(domainSamples, 'noaaTime', dsColumns, maxResolution)

  //re-build the x axes label series when the date filter changes, or new data is loaded in
  const xSeries = formAxesSeries(dsSamples, 'noaaTime')

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
      activeUnit={activeUnit}
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
