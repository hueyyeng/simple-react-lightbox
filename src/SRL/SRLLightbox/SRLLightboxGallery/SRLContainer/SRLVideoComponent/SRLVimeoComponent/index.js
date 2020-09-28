import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SRLEmbedVideoWrapper } from '../../../../../styles/SRLElementContainerStyles'

export default function SRLVimeoComponent({
  src,
  width,
  height,
  autoplay,
  controls,
  muted
}) {
  const [videoData, setVideoData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchVimeoVideo() {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=${src}&width=${width}&height=${height}&autoplay=${autoplay}&controls=${controls}&muted=${muted}`
      ).catch((e) => {
        console.log(e)
        throw e
      })
      const data = await response.json()
      setVideoData(data)
    }

    fetchVimeoVideo().catch((e) => {
      setError(true)
    })
  }, [src, autoplay, controls, width, height, muted])

  return !videoData ? (
    !error ? (
      <span className="SRLVimeoVideoLoading">Loading Vimeo video...</span>
    ) : (
      <span>Something went wrong loading the video</span>
    )
  ) : (
    <SRLEmbedVideoWrapper
      className="SRLEmbedVideoWrapper"
      wrapperWidth={width}
      dangerouslySetInnerHTML={{ __html: videoData.html }}
    />
  )
}

SRLVimeoComponent.propTypes = {
  controls: PropTypes.bool,
  muted: PropTypes.bool,
  autoplay: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string
}
