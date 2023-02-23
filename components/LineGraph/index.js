import dayjs from 'dayjs'
import 'chartjs-adapter-dayjs-4';
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
  TimeScale,
  TimeSeriesScale
} from "chart.js";
import { formXYData, formXYSeries } from '../../helpers/data';
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
  TimeScale,
  TimeSeriesScale
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
  // const xyData = formXYData(data, x, y);
  //
  // console.log(xyData.labels[0])
  const xySeries = formXYSeries(data, x, y);
  const chartData = {
    // labels: xyData.labels,
    datasets: [
      {
        data: xySeries,
        borderColor: color,
        backgroundColor: color
      }
    ]
  }

  console.log(xySeries[0].x)
  console.log(xySeries[xySeries.length - 1].x)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    padding: 10,
    scales: {
      x: {
        type: 'time',
        time: {
          // unit: 'day',
          tooltipFormat: 'MMM D, hh:mm, YYYY',
          displayFormats: {
            day: "MMM D, YYYY",
            hour: "MMM D, YYYY",
            minute: 'MMM d, YYYY'
          },
        },
        reverse: true,
        maxTicksLimit: 10,
        grid: {
          display: false
        },
        ticks: {
          autoSkip: true,
          autoSkipPadding: 40,
          major: {
            enabled: true
          }
        },
        min: xySeries[0].x,
        max: xySeries[xySeries.length - 1].x
      },
      y: {
        beginAtZero: true,
      }
    },
    plugins: {
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
        limits: {
          x: {min: 'original', max: 'original'},
          x2: {min: 'original', max: 'original'}
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          drag: {
            enabled: true
          },
          mode: "x",
          sensitivity: 0.1
        }
      }
    }
  }

  return <div style={{height: '100%', position: 'relative'}}><Line options={options} data={chartData} /></div>
  // <ResponsiveLineCanvas {...defaultProps} {...props} />;
};

// const defaultProps = {
//   curve: 'linear',
//   margin: { top: 10, right: 40, bottom: 50, left: 40 },
//   xScale: {
//     type: 'linear',
//     min: xMin, // Always use the latest date from the filtered data as the maximum point on the graph -- left side of x-axis.
//                                                              // Otherwise, use the provided date from the Graphs date filter or the graph date seeker
//                                                              // This avoids holes in the graph when the latest available date with values is up to a day or more behind
//     max: xMax
//   },
//   yScale: {
//     type: 'linear',
//     stacked: false,
//     min: dataPoint.min || 0,
//     max: dataPoint.max || 'auto'
//   },
//   enableGridX: false,
//   lineWidth: 1,
//   pointSize: 0,
//   tooltip: (props) =>
//     GraphTooltip({ label, unit, overlayGraph, data, ...props }),
//   axisBottom: {
//     format: (d) => dayjs(d).format('MMM D, YYYY'),
//     tickValues: 3,
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 30,
//   },
//   data: dataRender,
//   colors: [color],
// };

export default LineGraph;