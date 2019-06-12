import React from 'react';
import PropTypes from 'prop-types';
import {Line, XAxis, YAxis} from 'recharts';
import {deriveSamplesFromStationData} from '../../helpers/data';
import Graph from '../Graph';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */

const Graphs = ({noaaData, stationData}) => {
  if (!noaaData || !stationData) return null;

  const stationSamples = deriveSamplesFromStationData({stationData});
  const slicedNoaaData = noaaData.slice(0, 10);
  const slicedStationSamples = stationSamples.slice(0, 10);

  const graphs = [
    {
      data: slicedNoaaData,
      header: 'Water Direction',
      xAxis: <XAxis dataKey="t" interval={0} />,
      yAxis: <YAxis type="number" unit="degrees" domain={[0, 360]} />,
      line: <Line type="monotone" dataKey="d" stroke="#8884d8" />,
    },
    {
      data: slicedNoaaData,
      header: 'Water Speed',
      xAxis: <XAxis dataKey="t" interval={0} />,
      yAxis: <YAxis type="number" unit="knots" domain={[0, 1.3]} />,
      line: <Line type="monotone" dataKey="s" stroke="#8884d8" />,
    },
    {
      data: slicedStationSamples,
      header: 'Percent Oxygen',
      xAxis: <XAxis dataKey="Date_Time" interval={0} />,
      yAxis: <YAxis type="number" unit="%" domain={[0, 100]} />,
      line: (
        <Line
          type="monotone"
          dataKey="Percent Oxygen_SDI_0_10_%"
          stroke="#8884d8"
        />
      ),
    },
    {
      data: slicedStationSamples,
      header: 'Salinity',
      xAxis: <XAxis dataKey="Date_Time" interval={0} />,
      yAxis: <YAxis type="number" unit="PPT" domain={[2, 5]} />,
      line: (
        <Line type="monotone" dataKey="Salinity_SDI_0_4_ppt" stroke="#8884d8" />
      ),
    },
    {
      data: slicedStationSamples,
      header: 'Turbidity',
      xAxis: <XAxis dataKey="Date_Time" interval={0} />,
      yAxis: <YAxis type="number" unit="NTU" domain={[0, 100]} />,
      line: (
        <Line
          type="monotone"
          dataKey="Turbidity_SDI_0_8_NTU"
          stroke="#8884d8"
        />
      ),
    },
    {
      data: slicedStationSamples,
      header: 'pH',
      xAxis: <XAxis dataKey="Date_Time" interval={0} />,
      yAxis: <YAxis type="number" unit="pH" domain={[-60, -60]} />,
      line: <Line type="monotone" dataKey="pH mV_SDI_0_7_V" stroke="#8884d8" />,
    },
  ];

  return (
    <div className="graphs">
      {graphs.map(graph => (
        <Graph key={graph.header} {...graph} />
      ))}
    </div>
  );
};

Graphs.defaultProps = {
  noaaData: null,
  stationData: null,
};

Graphs.propTypes = {
  noaaData: PropTypes.array,
  stationData: PropTypes.object,
};

export default Graphs;
