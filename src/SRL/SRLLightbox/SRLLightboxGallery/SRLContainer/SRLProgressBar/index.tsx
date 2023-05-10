import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { ISRLProgressBarComponent } from '../../../../../types'
import { useInterval } from '../../../../SRLHooks'
import {
  SRLProgressBar,
  SRLProgressBarWrapper
} from '../../../../styles/SRLProgressBarStyles'

const SRLProgressBarComponent = ({
  autoplay,
  autoplaySpeed,
  progressBar,
  currentElementID
}: ISRLProgressBarComponent) => {
  const [isPlaying, setIsPlaying] = useState(false)

  // Call of the interval to fill the progress bar
  function fillProgressBar() {
    setIsPlaying(true)
  }

  useEffect(() => {
    setIsPlaying(false)
  }, [currentElementID])

  // Use interval hook
  useInterval(
    () => fillProgressBar(),
    autoplay ? autoplaySpeed / 100 : null,
    currentElementID
  )

  return (
    <SRLProgressBarWrapper
      barHeight={progressBar.height}
      backgroundColor={progressBar.backgroundColor}
      className="SRLProgressBar"
    >
      <SRLProgressBar
        barHeight={progressBar.height}
        fillColor={progressBar.fillColor}
        style={{
          transform: `scaleX(${isPlaying ? 1 : 0})`,
          transitionDuration: `${isPlaying ? autoplaySpeed + 'ms' : '0ms'}`
        }}
      />
    </SRLProgressBarWrapper>
  )
}

SRLProgressBarComponent.propTypes = {
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  currentElementID: PropTypes.string,
  progressBar: PropTypes.shape({
    backgroundColor: PropTypes.string,
    fillColor: PropTypes.string,
    height: PropTypes.string
  })
}

export default SRLProgressBarComponent
