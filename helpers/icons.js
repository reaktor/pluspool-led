import BacteriaIcon from '../static/img/icons/bacteria.svg'
import DirectionIcon from '../static/img/icons/direction.svg'
import OxygenIcon from '../static/img/icons/oxygen.svg'
import SalinityIcon from '../static/img/icons/salinity.svg'
import SpeedIcon from '../static/img/icons/speed.svg'
import TurbidityIcon from '../static/img/icons/turbidity.svg'

const svgIcons = {
  bacteria: () => <BacteriaIcon />,
  direction: () => <DirectionIcon />,
  oxygen: () => <OxygenIcon />,
  salinity: () => <SalinityIcon />,
  speed: () => <SpeedIcon />,
  turbidity: () => <TurbidityIcon />,
  ph: () => <OxygenIcon />
}

export { svgIcons }
