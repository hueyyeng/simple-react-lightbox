import React, { useState } from 'react'
import { useInterval } from 'react-use'
import { SRLProgressBar, SRLProgressBarWrapper } from '../../styles'
import PropTypes from 'prop-types'

const SRLProgressBarComponent = ({ autoplay, autoplaySpeed, progressBar }) => {
  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Call of the interval to fill the progress bar
  function fillProgressBar() {
    setPercentage(percentage + 1)
    setIsPlaying(true)
    if (percentage >= 100) {
      setPercentage(0)
      setIsPlaying(false)
    }
  }

  // Use interval hook
  useInterval(() => fillProgressBar(), autoplay ? autoplaySpeed / 100 : null)

  return (
    <SRLProgressBarWrapper
      barHeight={progressBar.height}
      backgroundColor={progressBar.backgroundColor}
      className="SRLProgressBar"
    >
      <SRLProgressBar
        barHeight={progressBar.height}
        fillColor={progressBar.fillColor}
        isPlaying={isPlaying}
        duration={autoplaySpeed}
        // style={{ transform: `translateX(${percentage}%)` }}
      />
    </SRLProgressBarWrapper>
  )
}

SRLProgressBarComponent.propTypes = {
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  progressBar: PropTypes.shape({
    backgroundColor: PropTypes.string,
    fillColor: PropTypes.string,
    height: PropTypes.string
  })
}

export default SRLProgressBarComponent
