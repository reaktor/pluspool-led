import DownloadIcon from '../../icons/DownloadIcon'
import { ENDPOINTS } from '../../helpers/constants'
import './index.css'

const DownloadData = () => (
  <a href={ENDPOINTS.samples} className='download-data'>
    <span className='download-data__label'>Download Data</span>
    <span className='download-data__icon'>
      <DownloadIcon />
    </span>
  </a>
)

export default DownloadData
