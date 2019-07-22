import DownloadIcon from '../../icons/DownloadIcon'
import { ENDPOINTS } from '../../helpers/constants'
import './index.css'

const DownloadData = () => {
  return (
    <div className='download-data'>
      <span className='download-data__label'>Download Data</span>
      <a href={ENDPOINTS.samples}>
        <DownloadIcon />
      </a>
    </div>
  )
}

export default DownloadData
