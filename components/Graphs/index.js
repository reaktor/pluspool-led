import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getSamples, before } from '../../helpers/data'
import Chart from '../Chart'
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
      header: 'Water Direction',
      unit: 'degrees',
      y: 'd'
    },
    {
      header: 'Water Speed',
      unit: 'knots',
      dataKey: 's'
    },
    {
      header: 'Percent Oxygen',
      unit: '%',
      y: 'Percent Oxygen_SDI_0_10_%'
    },
    {
      header: 'Salinity',
      unit: 'PPT',
      dataKey: 'Salinity_SDI_0_4_ppt'
    },
    {
      header: 'Turbidity',
      unit: 'NTU',
      y: 'Turbidity_SDI_0_8_NTU'
    },
    {
      header: 'pH',
      unit: 'pH',
      y: 'pH mV_SDI_0_7_V'
    }
  ]

  const choices = ['day', 'week', 'month', 'year']

  return (
    <>
      <Choices choices={choices} onChange={setSpan} name='span' />
      <div className='graphs'>

        {graphs.map(graph => (
          <Chart x='Date_Time' domain={domain} data={data} {...graph} />
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
