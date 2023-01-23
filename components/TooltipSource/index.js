
import QuestionMark from '../../icons/QuestionMark'

import './index.css'

const TooltipSource = ({ source }) => source && (
  <>
    <div className='tooltip-source'>
      <div className='tooltip-source__question-mark'>
        <QuestionMark />
      </div>
      <div className='tooltip-source__source'>
        <div className='tooltip-source__source_label'>We got this data from:</div>
        <a className='tooltip-source__source__link' href={source}>{source}</a>
      </div>
    </div>
  </>
)

export default TooltipSource
