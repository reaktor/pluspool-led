import React from 'react';
import PropTypes from 'prop-types';
import {LineChart, ResponsiveContainer, Tooltip} from 'recharts';

const Graph = ({data, header, xAxis, yAxis, line}) => (
  <div>
    <h2>{header}</h2>
    <ResponsiveContainer height={400} width="100%">
      <LineChart data={data}>
        {xAxis}
        {yAxis}
        {line}
        <Tooltip wrapperStyle={{color: 'black'}} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

Graph.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.node.isRequired,
  xAxis: PropTypes.node.isRequired,
  yAxis: PropTypes.node.isRequired,
  line: PropTypes.node.isRequired,
};

export default Graph;
