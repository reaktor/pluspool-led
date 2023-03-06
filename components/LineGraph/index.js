import cx from 'classnames';
import { Line } from 'react-chartjs-2';
import { formatTimeStamp, formAxesSeries } from '../../helpers/data';
import styles from './LineGraph.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DATE_UNITS } from '../../helpers/constants';

const LineGraph = ({
  activeUnit,
  slug,
  y,
  label,
  unit,
  data,
  color,
  xSeries,
  domain: [xMin, xMax],
  overlayGraph,
  hasOverlay
}) => {
  const [dragging, setDragging] = useState(false);
  const chartRef = useRef(null); //set up the reference to the chart


  const yData = useMemo(() => {
    return formAxesSeries(data, y)
  }, [data, y]);


  //set the overlay graph data if it's selected and the slug isn't the same as the current graph, to avoid double re-computing of the same exact graph
  const overlayYData = useMemo(() => {
    if(overlayGraph && overlayGraph.slug !== slug) return formAxesSeries(overlayGraph.data, overlayGraph.y)
    return null;
  }, [overlayGraph, slug]);

  const onMouseDown = () => {
    setDragging(true);
  }

  const onMouseUp = () => {
    setDragging(false)
  }

  //apply the graph data as the original / first Y axes
  const chartData = useMemo(() => ({
    labels: xSeries,
    datasets: [
      {
        data: yData,
        label,
        unit,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 1
      }
    ]
  }), [xSeries, yData, label, color, unit])


  //apply the overlay data as the secondary Y axes
  const extendedChartData = useMemo(() => {
    //only extend with the overlay data, if the y overlay data is available and the overlay slug isn't the same as the original graph
    if(overlayYData && overlayGraph) {
      return {
        ...chartData,
        datasets: [
          ...chartData.datasets,
          {
            yAxisID: 'y2',
            data: overlayYData,
            label: overlayGraph.label,
            unit: overlayGraph.unit,
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

  //set up the graph options
  const options = useMemo(() => {
    const format = activeUnit === DATE_UNITS.DAY ? 'MMM D YY hh:mm A' : null;

    return {
      responsive: true,
      animation: false,
      spanGaps: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          reverse: true,
          grid: {
            display: false
          },
          ticks: {
            autoSkip: true,
            autoSkipPadding: activeUnit === DATE_UNITS.WEEK ? 85 : 40,
            labelOffset: activeUnit === DATE_UNITS.WEEK ? -20 : 0,
            callback: function (value) {
              //label formatting
              const formattedValue = formatTimeStamp(this.getLabelForValue(value), format);
              return formattedValue;
            }
          },
        },
        y: {
          beginAtZero: true
        },
        //settings for the overlay graph
        y2: {
          display: false,
          position: 'right',
          beginAtZero: true,
          grid: {
            display: false
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw.toFixed(2)} ${context.dataset.unit}`
            },
            title: function (context) {
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
            mode: "x",
            reverse: true
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: "x",
          }
        }
      }
    }
  }, [activeUnit]); //recompute the graph options only when the activeUnit date filter changes, so the zoom can be properly reset with different allowed ranges. otherwise keep the existing graph options

  // Update the chart without re-rendering by enabling the display of the secondary y axes in place
  // This keeps existing chart options in place, along with values that were calculated by the chart itself, such as zoom and pan without resetting.
  useEffect(() => {
    //use the chart reference to update the chart in place
    if(chartRef.current && hasOverlay) {
      chartRef.current.options.scales.y2.display = hasOverlay
      chartRef.current.update()
    }
  }, [hasOverlay])

  //wrap the line chart in a div wrapper that takes up the full height of its parent, so the graph takes up the full space without having to modify its own styles
  return (
    <div className={cx(styles.lineGraphWrapper, {[styles.mouseDown]: dragging})} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <Line ref={chartRef} options={options} data={extendedChartData} />
    </div>
  )
};


export default LineGraph;