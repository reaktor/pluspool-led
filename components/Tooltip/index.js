import React from 'react'
import Link from 'next/link'
import { ICON_SVG_PATHS } from '../../helpers/constants'

import './index.css'

const contents = {
  bacteria: {
    header: 'Bacteria',
    body: (
      <p>While not generally harmful to humans, the presence of bacteria in the genus Enterococcus in a water body indicates possible fecal waste contamination. This waste is likely to contain pathogenic microbes and can cause disease in those using the water body directly (i.e. swimming) or indirectly (i.e. consuming marine life). The New York City Department of Health declares values under 35 Colony Forming Units (CFU) as acceptable, 35-104 CFU acceptable if transient, and greater than 104 CFU unacceptable. While the concentration of Enterococci generally takes 24 hours to be measured, we have developed a predictive algorithm based off highly correlated environmental parameters, such as precipitation, in order to present in real-time the probable concentration of Enterococci. Like the standard 24 hour measurement, this value is reported in Most Probable Number, or MPN.</p>
    )
  },
  direction: {
    header: 'Direction',
    body: (
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus purus, euismod aliquam lacinia sit amet, semper in nulla. Aliquam erat volutpat. Proin consequat dapibus magna sit amet feugiat. Integer ultrices feugiat urna, pellentesque sagittis ante suscipit at. Duis pellentesque erat vitae accumsan vulputate. Quisque urna neque, luctus sed sapien non, euismod pharetra felis. Sed gravida porttitor elit mattis vehicula. Aenean nec est commodo, viverra turpis efficitur, tincidunt leo.</p>
    )
  },
  oxygen: {
    header: 'Oxygen',
    body: (
      <p>Dissolved oxygen is introduced into the water by photosynthetic organisms and air-water gas exchange, and is consumed during respiration. Levels are highest during daylight and drop during the night as there is no photosynthesis to counteract consumption. Just like on land, oxygen is critical for many species of marine life, and low levels (hypoxia or anoxia) will stress or even suffocate organisms, resulting in large die-offs. Oxygen levels are primarily controlled by biological production and consumption, temperature (higher temperature decreases the solubility), and the physical mixing.</p>
    )
  },
  salinity: {
    header: 'Salinity',
    body: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    )
  },
  speed: {
    header: 'Speed',
    body: (
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus purus, euismod aliquam lacinia sit amet, semper in nulla. Aliquam erat volutpat. Proin consequat dapibus magna sit amet feugiat. Integer ultrices feugiat urna, pellentesque sagittis ante suscipit at. Duis pellentesque erat vitae accumsan vulputate. Quisque urna neque, luctus sed sapien non, euismod pharetra felis. Sed gravida porttitor elit mattis vehicula. Aenean nec est commodo, viverra turpis efficitur, tincidunt leo.</p>
    )
  },
  turbidity: {
    header: 'Turbidity',
    body: (
      <p>Turbidity is a measurement of the clarity of water, and thus is indicative of how many particles are suspended. Turbidity is important parameter of water quality because microbes and heavy metals may adhere to these particles. Additionally, the clarity of the water affects light penetration, habitat quality, and sedimentation rates.</p>
    )
  }
}

const getContent = (key) => (contents[key] || { header: null, body: null })

const Tooltip = ({ closeTooltip, open, position: { x, y }, tooltipKey }) => {
  const content = getContent(tooltipKey)
  const { header, body } = content
  const svgPath = ICON_SVG_PATHS[tooltipKey]

  return (
    <div className='tooltip-wrapper'>
      <div className='tooltip' data-active={open}>
        <button
          className='tooltip__close-button'
          type='button'
          onClick={closeTooltip}
        >&times;</button>
        <img src={svgPath} alt={`${header} icon`} />
        <h4 className='tooltip__header'>{header}</h4>
        <div className='tooltip__body'>
          {body}
        </div>
        <Link href='/data'>
          <a className='tooltip__link'>View the data</a>
        </Link>
      </div>
    </div>
  )
}

export default Tooltip
