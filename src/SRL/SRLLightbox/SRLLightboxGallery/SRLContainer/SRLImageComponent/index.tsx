import React, { useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { AnimatePresence } from 'framer-motion'

import { IImageLoad } from '../../../../../types'
import {
  SRLImage,
  SRLPanzoomedImage
} from '../../../../styles/SRLElementContainerStyles'
import SRLLoadingIndicator from '../SRLLoadingIndicator'

const ImageLoad = React.memo(
  ({
    src,
    caption,
    limitToBounds,
    disablePanzoom,
    handlePanzoom,
    panzoomEnabled,
    boxShadow,
    imgHeight,
    imgWidth
  }: IImageLoad) => {
    const [loading, setLoading] = useState(true)

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length > 1 && !panzoomEnabled && e.cancelable) {
        e.preventDefault()
        handlePanzoom(true)
      }
    }

    useEffect(() => {
      const imageToLoad = new Image()
      imageToLoad.src = src || ''
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
        src={src || ''}
        className="SRLImage"
        disablePanzoom={disablePanzoom}
        onClick={() => handlePanzoom(true)}
        alt={caption || 'SRL Image'}
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
        limitToBounds={limitToBounds}
      >
        <TransformComponent>
          <SRLPanzoomedImage
            src={src || ''}
            className="SRLImage SRLImageZoomed"
            alt={caption || 'SRL Image Zoomed'}
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

// ImageLoad.propTypes = {
//   handlePanzoom: PropTypes.func,
//   src: PropTypes.string,
//   caption: PropTypes.string,
//   limitToBounds: PropTypes.bool,
//   disablePanzoom: PropTypes.bool,
//   boxShadow: PropTypes.string,
//   panzoomEnabled: PropTypes.bool,
//   containerRef: PropTypes.any,
//   imgWidth: PropTypes.number,
//   imgHeight: PropTypes.number
// }
