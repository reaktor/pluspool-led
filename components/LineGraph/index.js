import { formXYSeries } from '../../helpers/data';
import GraphTooltip from '../GraphTooltip';
import dayjs from 'dayjs';
import { ResponsiveLineCanvas } from '@nivo/line';

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
  const dataRender = [{ id: label, data: formXYSeries(data, x, y) }];
  const defaultProps = {
    curve: 'linear',
    margin: { top: 10, right: 40, bottom: 50, left: 40 },
    xScale: {
      type: 'linear',
      min: xMin,
      max: xMax,
    },
    yScale: {
      type: 'linear',
      stacked: false,
      min: dataPoint.min || 'auto',
      max: dataPoint.max || 'auto',
    },
    enableGridX: false,
    lineWidth: 1,
    pointSize: 0,
    tooltip: (props) =>
      GraphTooltip({ label, unit, overlayGraph, data, ...props }),
    axisBottom: {
      format: (d) => dayjs(d).format('MMM D, YYYY'),
      tickValues: 3,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 30,
    },
    data: dataRender,
    colors: [color],
  };

  return <ResponsiveLineCanvas {...defaultProps} {...props} />;
};

export default LineGraph;