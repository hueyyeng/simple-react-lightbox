import React from 'react'
import YouTube from 'react-youtube'
import PropTypes from 'prop-types'
import { SRLEmbedVideoWrapper } from '../../../../../styles/SRLElementContainerStyles'

export default function SRLYoutubeComponent({
  controls,
  autoplay,
  width,
  height,
  src
}) {
  const videoId = src.split('?v=')[1]

  const opts = {
    height,
    width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: controls === false ? 0 : 1,
      autoplay: autoplay === false ? 0 : 1
    }
  }

  return (
    <SRLEmbedVideoWrapper wrapperWidth={width}>
      <YouTube
        className="SRLEmbedVideoWrapper"
        containerClassName="SRLYouTubeWrapper"
        videoId={videoId}
        opts={opts}
      />
    </SRLEmbedVideoWrapper>
  )
}

SRLYoutubeComponent.propTypes = {
  controls: PropTypes.bool,
  autoplay: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string
}
