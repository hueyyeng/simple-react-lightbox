import React, { useState, useEffect } from 'react'
import {
  SRLImage,
  SRLPanzoomedImage
} from '../../../../styles/SRLElementContainerStyles'
import SRLLoadingIndicator from '../SRLLoadingIndicator'
import PropTypes from 'prop-types'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { AnimatePresence } from 'framer-motion'

const ImageLoad = React.memo(
  ({
    src,
    caption,
    disablePanzoom,
    handlePanzoom,
    panzoomEnabled,
    boxShadow,
    imgHeight,
    imgWidth
  }) => {
    const [loading, setLoading] = useState(true)

    function handleTouchStart(e) {
      if (e.touches.length > 1 && !panzoomEnabled && e.cancelable) {
        e.preventDefault()
        handlePanzoom(true)
      }
    }

    useEffect(() => {
      const imageToLoad = new Image()
      imageToLoad.src = src
      imageToLoad.onload = () => {
        // When image is loaded set loading to false
        setLoading(false)
      }
    }, [src])

    useEffect(() => {
      document.addEventListener('touchstart', handleTouchStart, {
        passive: false
      })

      return () => {
        document.addEventListener('touchstart', handleTouchStart, {
          passive: false
        })
      }
    }, [])

    const content = loading ? (
      <SRLLoadingIndicator />
    ) : !panzoomEnabled ? (
      <SRLImage
        src={src}
        className="SRLImage"
        disablePanzoom={disablePanzoom}
        onClick={() => handlePanzoom(true)}
        alt={caption}
        boxShadow={boxShadow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut' }}
        width={imgWidth}
        height={imgHeight}
      />
    ) : (
      <TransformWrapper
        maxScale={6}
        minScale={0.5}
        wheel={{ step: 0.5 }}
        zoomAnimation={{ animationType: 'easeInOutQuad' }}
      >
        <TransformComponent>
          <SRLPanzoomedImage
            src={src}
            className="SRLImage SRLImageZoomed"
            alt={caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut' }}
          />
        </TransformComponent>
      </TransformWrapper>
    )

    return <AnimatePresence>{content}</AnimatePresence>
  }
)

export default ImageLoad

ImageLoad.displayName = 'ImageLoad'

ImageLoad.propTypes = {
  handlePanzoom: PropTypes.func,
  src: PropTypes.string,
  caption: PropTypes.string,
  disablePanzoom: PropTypes.bool,
  boxShadow: PropTypes.string,
  panzoomEnabled: PropTypes.bool,
  containerRef: PropTypes.any,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number
}
