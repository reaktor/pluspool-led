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
  Legend,
  // TimeScale,
  // TimeSeriesScale
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
  zoomPlugin,
  // TimeScale,
  // TimeSeriesScale
);

const LineGraph = ({
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
  const [xyData, setxyData] = useState(formXYData(data, x, y))
  // const xyData = formXYData(data, x, y);

  useEffect(() => {
    console.log('forming')
    setxyData(formXYData(data, x, y))
  }, [data, x, y, setxyData])


  const onMouseDown = () => {
    setDragging(true);
  }

  const onMouseUp = () => {
    setDragging(false)
  }


  //TODO :: Look into splitting out the X series label forming out to the graphs component itself, so each chart doesn't have to do it, as the Y values are set to the same dates

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
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 1
      }
    ]
  }), [xyData.labels, xyData.yData])

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   padding: 10,
  //   scales: {
  //     x: {
  //       // type: 'numeric',
  //       // time: {
  //       //   // unit: 'day',
  //       //   tooltipFormat: 'MMM D, hh:mm, YYYY',
  //       //   displayFormats: {
  //       //     day: "MMM D, YYYY",
  //       //     hour: "MMM D, YYYY",
  //       //     minute: 'MMM d, YYYY'
  //       //   },
  //       // },
  //       reverse: true,
  //       maxTicksLimit: 10,
  //       grid: {
  //         display: false
  //       },
  //       ticks: {
  //         autoSkip: true,
  //         autoSkipPadding: 40,
  //         callback: function(value) {
  //           const formattedValue = formatTimeStamp(this.getLabelForValue(value));
  //           return formattedValue
  //         }
  //       },
  //     },
  //     y: {
  //       beginAtZero: true
  //     }
  //   },
  //   plugins: {
  //     tooltip: {
  //       callbacks: {
  //         label: function(context) {
  //           return `${label}: ${context.raw.toFixed(2)} ${unit}`
  //         },
  //         title: function(context) {
  //          const formattedValue = formatTimeStamp(Number(context[0].label), 'MMM DD YYYY hh:mm A');
  //          return formattedValue;
  //         }
  //       }
  //     },
  //     title: {
  //       display: false,
  //     },
  //     legend: {
  //       display: false
  //     },
  //     zoom: {
  //       pan: {
  //         enabled: true,
  //         mode: "x"
  //       },
  //       zoom: {
  //         wheel: {
  //           enabled: true
  //         },
  //         pinch: {
  //           enabled: true
  //         },
  //         // drag: {
  //         //   enabled: true
  //         // },
  //         mode: "x"
  //       }
  //     }
  //   }
  // }

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
            autoSkipPadding: 40,
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
              return `${label}: ${context.raw.toFixed(2)} ${unit}`
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

  return <div className={cx(styles.lineGraphWrapper, {[styles.mouseDown]: dragging})} onMouseDown={onMouseDown} onMouseUp={onMouseUp}><Line options={options} data={chartData} /></div>
};


export default LineGraph;