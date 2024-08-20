import React, { useState } from "react";
import PropTypes from "prop-types";
import { formAxesSeries } from "../../helpers/data";
import content from "../../content";
import Graph from "../Graph";
import GraphsDateFilter from "../GraphsDateFilter";
import DownloadData from "../DownloadData";
import styles from "./Graphs.module.css";
import DataDisclaimer from "../DataDisclaimer";
import { DATE_UNITS } from "../../helpers/constants";
import { useRouter } from "next/router";

//Import ChartJs and register all the plugins necessary for our usage
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ReloadButton from "../ReloadButton";

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

// const maxResolution = 1000; // points

const timeUnits = Array.from(Object.values(DATE_UNITS));

const dsColumns = Array.from(Object.keys(content.dataPoints));

const Graphs = ({ openTooltip, units, samples }) => {
  const [activeDateFilter, setActiveDateFilter] = useState(DATE_UNITS.WEEK);
  const router = useRouter();
  // const latestSampleTimestamp = samples[samples.length -1].noaaTime

  // const [domain, setDomain] = useState([latestSampleTimestamp, before(activeDateFilter, latestSampleTimestamp)])
  const [overlayGraph, setOverlayGraph] = useState(null);

  // const setSpan = unit => setDomain([latestSampleTimestamp, before(unit, latestSampleTimestamp)])
  const filterOnClick = (unit) => {
    setActiveDateFilter(unit);
    // setSpan(unit)
  };

  const onRefreshClick = () => {
    router.reload();
  };

  // const [max, min] = domain

  // const domainSamples = cutData(samples, 'noaaTime', min, max)
  // const dsSamples = downsampleData(domainSamples, 'noaaTime', dsColumns, maxResolution)

  const data = samples[activeDateFilter];

  //re-build the x axes label series when the date filter changes, or new data is loaded in
  const xSeries = formAxesSeries(data, "noaaTime");

  if (!data) return null;

  const graphProps = (key) => ({
    x: "noaaTime",
    y: content.dataPoints[key].slug,
    data: data,
    unit: units[content.dataPoints[key].slug],
    ...content.dataPoints[key],
  });

  const graphs = dsColumns.map((key) => (
    <Graph
      key={key}
      activeDateFilter={activeDateFilter}
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
          activeDateFilter={activeDateFilter}
          onChange={filterOnClick}
          name="span"
        />
        <div className={styles.reloadButtonContainer}>
          <ReloadButton />
        </div>
        <DownloadData />
        <DataDisclaimer />
      </div>
      <div className={styles.container}>{graphs}</div>
    </>
  );
};

Graphs.defaultProps = {
  samples: null,
};

Graphs.propTypes = {
  samples: PropTypes.object,
};

export default Graphs;
