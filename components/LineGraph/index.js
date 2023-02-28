// import 'chartjs-adapter-dayjs-4';
import cx from 'classnames';
import { Line } from 'react-chartjs-2';

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
import { formatTimeStamp, formAxisSeries, formXYData } from '../../helpers/data';
import styles from './LineGraph.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

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

const LineGraph = ({
  slug,
  x,
  y,
  label,
  unit,
  data,
  color,
  xSeries,
  domain: [xMin, xMax],
  props,
  overlayGraph,
  dataPoint,
}) => {
  const [dragging, setDragging] = useState(false);
  // const [overlayYData, setOverlayYData] = useState(null);

  // useEffect(() => {
  //   setxyData(formXYData(data, x, y))
  // }, [xMax, x, y, setxyData])


  const yData = useMemo(() => {
    // console.log('running graph' )
    return formAxisSeries(data, y)
  }, [data, y]);

  // //set the overlay graph data if it's selected and the slug isn't the same as the current graph, to avoid double re-computing of the same exact graph
  // useEffect(() => {
  //   if(overlayGraph && overlayGraph.slug !== slug) {
  //     setOverlayYData(formAxisSeries(overlayGraph.data, overlayGraph.y))
  //   } else {
  //     //otherwise make sure the overlay Y data is null and isn't being used
  //     setOverlayYData(null)
  //   }
  // }, [xSeries, overlayGraph, x, slug])

  const overlayYData = useMemo(() => {
    if(overlayGraph && overlayGraph.slug !== slug) return formAxisSeries(overlayGraph.data, overlayGraph.y)
    return null;
    //TODO :: look into the need for xSeries here
  }, [overlayGraph, slug]);

  const onMouseDown = () => {
    setDragging(true);
  }

  const onMouseUp = () => {
    setDragging(false)
  }

  const chartData = useMemo(() => ({
    labels: xSeries,
    datasets: [
      {
        data: yData,
        label,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 1
      }
    ]
  }), [xSeries, yData, label, color, ])


  //apply the overlay data as the secondary Y axis
  const extendedChartData = useMemo(() => {
    //only extend with the overlay, if the y overlay data is available and the overlay slug isn't the same as the original graph
    if(overlayYData && overlayGraph) {
      return {
        ...chartData,
        datasets: [
          ...chartData.datasets,
          {
            yAxisID: 'y2',
            data: overlayYData,
            label: overlayGraph.label,
            borderColor: overlayGraph.color,
            backgroundColor: overlayGraph.color,
            borderWidth: 2,
            pointRadius: 1
          }
        ]
      }
    }
      return chartData;
    }, [overlayYData, overlayGraph, chartData])

  const options = useMemo(() => ({
      responsive: true,
      animation: false,
      spanGaps: true,
      maintainAspectRatio: false,
      // padding: 10,
      scales: {
        x: {
          reverse: true,
          maxTicksLimit: 10,
          grid: {
            display: false
          },
          ticks: {
            autoSkip: true,
            autoSkipPadding: 50,
            callback: function(value) {
              const formattedValue = formatTimeStamp(this.getLabelForValue(value));
              return formattedValue
            }
          },
        },
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw.toFixed(2)} ${unit}`
            },
            title: function(context) {
              const formattedValue = formatTimeStamp(Number(context[0].label), 'MMM DD YYYY hh:mm A');
              return formattedValue;
            }
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "x"
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: "x"
          }
        }
      }
    //eslint-disable-next-line
  }), [xSeries, unit]); //recompute the graph options when the xSeries changes based on the date filter, so the graph can reset zoom level to the new range, false positive warning on not needing xSeries

  //apply the overlay graph to the secondary Y axis options
  const extendedOptions = useMemo(() => {
    if(overlayGraph && overlayGraph.slug !== slug) {
      return {
        ...options,
        scales: {
          ...options.scales,
          y2: {
            position: 'right',
            beginAtZero: true,
            grid: {
              display: false
            }
          }
        }
      }
    }
    return options;
  }, [overlayGraph, slug, options]);

  return <div className={cx(styles.lineGraphWrapper, {[styles.mouseDown]: dragging})} onMouseDown={onMouseDown} onMouseUp={onMouseUp}><Line options={extendedOptions} data={extendedChartData} /></div>
};


export default LineGraph;