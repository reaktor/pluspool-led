
import TitleTextTooltip from '../components/TitleTextTooltip'

const tooltipText = 'But even if we say water is great for swimming, we are NOT suggesting that you get in it! This dashboard does not condone unsanctioned swimming and is only an awareness platform. Please don\'t jump in until we have a + POOL!'

export default {
  introText: (
    <>
      We’re tracking water quality of the river at Pier 35, the future site of
      NYC’s first water-filtering floating swimming pool.
    </>
  ),
  introCta: 'Click here to see the results.',
  bacteriaText: {
    acceptable: (
      <>
        great for{' '}
        <TitleTextTooltip tooltipText={tooltipText}>swimming</TitleTextTooltip>.
      </>
    ),
    unacceptablePersist: (
      <>
        not great for{' '}
        <TitleTextTooltip tooltipText={tooltipText}>swimming</TitleTextTooltip>{' '}
        if levels persist.
      </>
    ),
    unacceptable: (
      <>
        not great for{' '}
        <TitleTextTooltip tooltipText={tooltipText}>swimming</TitleTextTooltip>.
      </>
    ),
  },
  statusText: (timestampDiff, bacteriaText) => (
    <>
      The water {timestampDiff} at Pier 35 was {bacteriaText}
    </>
  ),
};
