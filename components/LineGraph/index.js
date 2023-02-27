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
import { formatTimeStamp, formXYData } from '../../helpers/data';
import styles from './LineGraph.module.css';
import { useEffect, useMemo, useState } from 'react';
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
  domain: [xMin, xMax],
  props,
  overlayGraph,
  dataPoint,
}) => {
  const [dragging, setDragging] = useState(false);
  // const [xyData, setxyData] = useState({})
  const [overlayxyData, setoverlayXyData] = useState(null);
  // const xyData = formXYData(data, x, y);

  //TODO :: Look into splitting out the X series label forming out to the graphs component itself, so each chart doesn't have to do it, as the Y values are set to the same dates
  //TODO :: Then look into switching to only calculating the Y series, here

  // useEffect(() => {
  //   setxyData(formXYData(data, x, y))
  // }, [xMax, x, y, setxyData])

  const xyData = useMemo(() => {
    console.log('running graph')
    return formXYData(data, x, y)
  }, [xMax, x, y]);

  //set the overlaygraph data if it's selected and the slug isn't the same as the current graph, to avoid double re-calculation
  useEffect(() => {
    if(overlayGraph && overlayGraph.slug !== slug) {
      setoverlayXyData(formXYData(overlayGraph.data, x, overlayGraph.slug))
    } else {
      //otherwise make sure the overlay Y data is null and isn't being used
      setoverlayXyData(null)
    }
  }, [xyData.labels, overlayGraph, x, slug])

  const onMouseDown = () => {
    setDragging(true);
  }

  const onMouseUp = () => {
    setDragging(false)
  }


  // const chartData = {
  //   labels: xyData.labels,
  //   datasets: [
  //     {
  //       data: xyData.yData,
  //       borderColor: color,
  //       backgroundColor: color,
  //       borderWidth: 2,
  //       pointRadius: 1
  //     }
  //   ]
  // }

  const chartData = useMemo(() => ({
    labels: xyData.labels,
    datasets: [
      {
        data: xyData.yData,
        label,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 1
      }
    ]
  }), [xyData.labels, xyData.yData])


  //apply the overlay data as the secondary Y axis
  const extendedChartData = useMemo(() => {
    //only extend with the overlay, if the y overlay data is available and the overlay slug isn't the same as the original graph
    if(overlayxyData && overlayGraph) {
      return {
        ...chartData,
        datasets: [
          ...chartData.datasets,
          {
            yAxisID: 'y2',
            data: overlayxyData.yData,
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
    }, [xyData.labels, overlayxyData, overlayGraph, slug])

  const options = useMemo(() => ({
      responsive: true,
      maintainAspectRatio: false,
      padding: 10,
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
              // console.log(context)
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
  }), [xyData.labels]);

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
  }, [overlayGraph, xyData.labels, slug]);

  return <div className={cx(styles.lineGraphWrapper, {[styles.mouseDown]: dragging})} onMouseDown={onMouseDown} onMouseUp={onMouseUp}><Line options={extendedOptions} data={extendedChartData} /></div>
};


export default LineGraph;