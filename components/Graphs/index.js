import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Line, XAxis, YAxis } from 'recharts'
import { getSamples, before } from '../../helpers/data'
import Graph from '../Graph'
import './index.css'

const Choices = ({ name, choices, onChange }) => {
  const innerOnChange = ({ target: { value } }) => onChange(value)

  const choiceToLabel = choice => {
    switch (choice) {
      case 'day': return 'Today'
      case 'week': return 'Past Week'
      case 'month': return 'Past Month'
      case 'year': return 'Past Year'
      default: return 'Select Date Range'
    }
  }

  return (
    <span className='choices'>
      { choices.map(choice => (
        <Choice name={name} choice={choice} onChange={innerOnChange} label={choiceToLabel(choice)} />
      )) }
    </span>
  )
}
const Choice = ({ name, choice, label, onChange }) => {
  return (
    <>
      <input type='radio' id={choice} name={name} value={choice} onChange={onChange} />
      <label for={choice}>{label}</label>
    </>
  )
}

const Graphs = ({ noaaData, stationData }) => {
  if (!noaaData || !stationData) return null

  const lastDayRange = {
    start: before('month'),
    end: Date.now()
  }

  const data = getSamples({ noaaData, stationData, range: lastDayRange })

  const [domain, setDomain] = useState([lastDayRange.start, lastDayRange.end])

  const setSpan = unit => setDomain([before(unit), Date.now()])

  const graphs = [
    {
      data,
      header: 'Water Direction',
      xAxis: <XAxis type='number' dataKey='Date_Time' interval={0} domain={domain} />,
      yAxis: <YAxis type='number' unit='degrees' domain={[0, 360]} />,
      line: <Line type='monotone' dataKey='d' stroke='#8884d8' />
    },
    {
      data,
      header: 'Water Direction',
      xAxis: <XAxis dataKey='Date_Time' interval={0} domain={domain} />,
      yAxis: <YAxis type='number' unit='degrees' domain={[0, 360]} />,
      line: <Line type='monotone' dataKey='d' stroke='#8884d8' />
    },
    {
      data,
      header: 'Water Speed',
      xAxis: <XAxis dataKey='Date_Time' interval={0} domain={domain} />,
      yAxis: <YAxis type='number' unit='knots' domain={[0, 1.3]} />,
      line: <Line type='monotone' dataKey='s' stroke='#8884d8' />
    },
    {
      data,
      header: 'Percent Oxygen',
      xAxis: <XAxis dataKey='Date_Time' interval={0} />,
      yAxis: <YAxis type='number' unit='%' domain={[0, 100]} />,
      line: (
        <Line
          type='monotone'
          dataKey='Percent Oxygen_SDI_0_10_%'
          stroke='#8884d8'
          domain={domain}
        />
      )
    },
    {
      data,
      header: 'Salinity',
      xAxis: <XAxis dataKey='Date_Time' interval={0} domain={domain} />,
      yAxis: <YAxis type='number' unit='PPT' domain={[2, 5]} />,
      line: (
        <Line type='monotone' dataKey='Salinity_SDI_0_4_ppt' stroke='#8884d8' />
      )
    },
    {
      data,
      header: 'Turbidity',
      xAxis: <XAxis dataKey='Date_Time' interval={0} domain={domain} />,
      yAxis: <YAxis type='number' unit='NTU' domain={[0, 100]} />,
      line: (
        <Line
          type='monotone'
          dataKey='Turbidity_SDI_0_8_NTU'
          stroke='#8884d8'
        />
      )
    },
    {
      data,
      header: 'pH',
      xAxis: <XAxis dataKey='Date_Time' interval={0} domain={domain} />,
      yAxis: <YAxis type='number' unit='pH' domain={[-60, -60]} />,
      line: <Line type='monotone' dataKey='pH mV_SDI_0_7_V' stroke='#8884d8' />
    }
  ]

  const choices = ['day', 'week', 'month', 'year']

  return (
    <>
      <Choices choices={choices} onChange={setSpan} name='span' />
      <div className='graphs'>

        {graphs.map(graph => (
          <Graph key={graph.header} {...graph} />
        ))}
      </div>
    </>
  )
}

Graphs.defaultProps = {
  noaaData: null,
  stationData: null
}

Graphs.propTypes = {
  noaaData: PropTypes.array,
  stationData: PropTypes.object
}

export default Graphs
