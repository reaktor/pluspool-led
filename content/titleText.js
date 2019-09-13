import React from 'react'
import TitleTextTooltip from '../components/TitleTextTooltip'

const tooltipText = 'But even if we say water is great for swimming, we are NOT suggesting that you get in it! This dashboard does not condone unsanctioned swimming and is only an awareness platform. Please don\'t jump in until we have a + POOL!'

export default {
  introText: <><span>We’re tracking the water in the NYC harbor at Pier 17.</span><span>How is the water today?</span></>,
  introCta: 'Click here to find out.',
  bacteriaText: {
    acceptable: <>acceptable to <TitleTextTooltip tooltipText={tooltipText}>swim in</TitleTextTooltip>.</>,
    unacceptablePersist: 'unnacceptable to swim in if levels persist.',
    unacceptable: 'unnacceptable to swim in.'
  },
  statusText: (timestampDiff, bacteriaText) => <>The water {timestampDiff} at Pier 17 was {bacteriaText}</>
}
