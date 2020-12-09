import React, { useState, useEffect } from 'react'
import { SRLImage } from '../../../../styles/SRLElementContainerStyles'
import SRLLoadingIndicator from '../SRLLoadingIndicator'
import PropTypes from 'prop-types'

const ImageLoad = React.memo(
  ({ src, caption, disablePanzoom, handlePanzoom, boxShadow }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const imageToLoad = new Image()
      imageToLoad.src = src
      imageToLoad.onload = () => {
        // When image is loaded set loading to false
        setLoading(false)
      }
    }, [src])

    return loading ? (
      <SRLLoadingIndicator />
    ) : (
      <SRLImage
        src={src}
        className="SRLImage"
        disablePanzoom={disablePanzoom}
        onClick={() => handlePanzoom(true)}
        alt={caption}
        boxShadow={boxShadow}
        style={{
          opacity: loading ? 0.5 : 1,
          transition: 'opacity .15s linear'
        }}
      />
    )
  }
)

export default ImageLoad

ImageLoad.displayName = 'ImageLoad'

ImageLoad.propTypes = {
  handlePanzoom: PropTypes.func,
  src: PropTypes.string,
  caption: PropTypes.string,
  disablePanzoom: PropTypes.bool,
  boxShadow: PropTypes.string
}
