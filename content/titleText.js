import React from 'react'
import TitleTextTooltip from '../components/TitleTextTooltip'

const tooltipText = `But you still shouldn't! This dashboard does not condone illegal swimming and is only an awareness platform. Please don't jump in until we have a +POOL!`

export default {
  introText: 'How is the water today?',
  introCta: 'Click here to find out.',
  bacteriaText: {
    acceptable: <>acceptable to <TitleTextTooltip tooltipText={tooltipText}>swim in</TitleTextTooltip>.</>,
    unacceptablePersist: 'unnacceptable to swim in if levels persist.',
    unacceptable: 'unnacceptable to swim in.'
  },
  statusText: (timestampDiff, bacteriaText) => <>The water {timestampDiff} at Pier 17 was {bacteriaText}</>
}