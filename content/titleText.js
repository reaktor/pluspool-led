import React from 'react'
import TitleTextTooltip from '../components/TitleTextTooltip'

const tooltipText = 'But even if we say water is great for swimming, we are NOT suggesting that you get in it! This dashboard does not condone unsanctioned swimming and is only an awareness platform. Please don\'t jump in until we have a + POOL!'

export default {
  introText: <><span>We tracked the water in the NYC harbor at Pier 17.</span></>,
  introCta: 'Click here see the results.',
  bacteriaText: {
    acceptable: <>great for <TitleTextTooltip tooltipText={tooltipText}>swimming</TitleTextTooltip>.</>,
    unacceptablePersist: <>not great for <TitleTextTooltip tooltipText={tooltipText}>swimming</TitleTextTooltip> if levels persist.</>,
    unacceptable: <>not great for <TitleTextTooltip tooltipText={tooltipText}>swimming</TitleTextTooltip>.</>
  },
  statusText: (timestampDiff, bacteriaText) => <>The water {timestampDiff} at Pier 17 was {bacteriaText}</>
}
