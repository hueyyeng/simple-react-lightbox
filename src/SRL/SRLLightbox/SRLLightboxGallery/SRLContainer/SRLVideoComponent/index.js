import React from 'react'
import SRLYouTubeComponent from './SRLYouTubeComponent'
import SRLVimeoComponent from './SRLVimeoComponent'
import { SRLEmbedVideoWrapper } from '../../../../styles/SRLElementContainerStyles'

export const SRLVideoComponent = (props) => {
  if (props.src.includes('youtube')) {
    return <SRLYouTubeComponent {...props} />
  } else if (props.src.includes('vimeo')) {
    return <SRLVimeoComponent {...props} />
  } else {
    return (
      <SRLEmbedVideoWrapper wrapperWidth={props.width} className="SRLVideo">
        <video
          controls={props.showControls}
          autoPlay={props.autoplay}
          muted={props.muted}
          src={props.src}
        />
      </SRLEmbedVideoWrapper>
    )
  }
}
