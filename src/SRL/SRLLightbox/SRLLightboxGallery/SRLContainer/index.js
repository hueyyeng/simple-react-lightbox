import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SRLThumbnailGalleryComponent from './SRLThumbnailGallery'
import SRLCaptionContainerComponent from './SRLCaption'
import { useSwipeable } from 'react-swipeable'
import { useDebouncedCallback } from 'use-debounce'
import subscribe from 'subscribe-event'
import { AnimatePresence } from 'framer-motion'
import { useOnClickOutside, useSizes } from '../../../SRLHooks'

import { SRLContainer } from '../../../styles/SRLContainerStyles'
import {
  SRLElementContainer,
  SRLElementWrapper,
  SRLImage,
  SRLPanzoomedImage
  // SRLLightboxVideo
} from '../../../styles/SRLElementContainerStyles'

function SRLContainerComponent({
  caption,
  direction,
  elements,
  handleCurrentElement,
  handleCloseLightbox,
  handleNextElement,
  handlePanzoom,
  handlePrevElement,
  height: imgWidth,
  hideThumbnails,
  id,
  options,
  panzoomEnabled,
  source,
  SRLPanzoomImageRef,
  SRLThumbnailsRef,
  SRLCaptionRef,
  width: imgHeight
}) {
  const { settings, thumbnails, caption: captionSettings } = options

  const [captionDivSizes] = useSizes(SRLCaptionRef)
  const [thumbnailsDivSizes] = useSizes(SRLThumbnailsRef)

  // Ref for the Content
  const SRLLightboxContentRef = useRef()

  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode
  const POSITIVE_X = isIE11 ? 1000 : '100%'
  const NEGATIVE_X = isIE11 ? -1000 : '-100%'

  const variants = {
    slideIn: (direction) => {
      return {
        x:
          direction === undefined
            ? 0
            : direction === 'next'
            ? POSITIVE_X
            : NEGATIVE_X,
        transition: {
          ease: settings.slideTransitionTimingFunction
        }
      }
    },
    slideOut: (direction) => {
      return {
        x: direction === 'previous' ? POSITIVE_X : NEGATIVE_X,
        transition: {
          ease: settings.slideTransitionTimingFunction
        }
      }
    },
    fadeIn: {
      opacity: 0,
      transition: {
        ease: settings.slideTransitionTimingFunction
      }
    },
    fadeOut: {
      opacity: 0,
      transition: {
        ease: settings.slideTransitionTimingFunction
      }
    },
    bothIn: (direction) => {
      return {
        opacity: 1,
        x: direction === undefined ? '0' : direction === 'next' ? 1000 : -1000,
        transition: {
          ease: settings.slideTransitionTimingFunction
        }
      }
    },
    bothOut: (direction) => {
      return {
        opacity: 0,
        x: direction === 'previous' ? 1000 : -1000,
        transition: {
          ease: settings.slideTransitionTimingFunction
        }
      }
    },
    center: {
      x: 0,
      opacity: 1
    }
  }

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextElement(id),
    onSwipedRight: () => handlePrevElement(id),
    delta: panzoomEnabled ? 500 : 90, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: true, // preventDefault on touchmove, *See Details*
    trackTouch: true, // track touch input
    trackMouse: false
  })

  // Debounce callback
  const [handleScrollWheel] = useDebouncedCallback(
    // function
    (value) => {
      if (value > 0) {
        handleNextElement(id)
      } else if (value < 0) {
        handlePrevElement(id)
      }
    },
    // delay in ms
    150
  )

  useEffect(() => {
    // Handle scrollwheel
    if (!panzoomEnabled && !settings.disableWheelControls) {
      const addWheelListener = subscribe(document, 'wheel', (e) =>
        handleScrollWheel(e.deltaY)
      )
      return () => {
        addWheelListener()
      }
    }
  }, [handleScrollWheel, panzoomEnabled, settings.disableWheelControls])

  // UseOnClickOutside
  useOnClickOutside(SRLLightboxContentRef, () => handleCloseLightbox())

  // // Check if it's an image to load the right content
  // const isImage = /\.(gif|jpg|jpeg|tiff|png|webp)$/i.test(source)

  // Light-box captions options
  const captionOptions = {
    captionAlignment: options.caption.captionAlignment,
    captionColor: options.caption.captionColor,
    captionContainerPadding: options.caption.captionContainerPadding,
    captionFontFamily: options.caption.captionFontFamily,
    captionFontSize: options.caption.captionFontSize,
    captionFontStyle: options.caption.captionFontStyle,
    captionFontWeight: options.caption.captionFontWeight,
    captionTextTransform: options.caption.captionTextTransform
  }

  return (
    <SRLContainer
      className="SRLContainer"
      ref={SRLLightboxContentRef}
      thumbnailsPosition={thumbnails.thumbnailsPosition}
      showCaption={captionSettings.showCaption}
      hideThumbnails={hideThumbnails}
    >
      <SRLElementContainer
        thumbnailsPosition={thumbnails.thumbnailsPosition}
        // showThumbnails is the "setting" passed from the user to the context to completely hide the thumbnails
        showThumbnails={thumbnails.showThumbnails}
        // hideThumbnails is the button that shows and hides the thumbnails on the go
        hideThumbnails={hideThumbnails}
        showCaption={captionSettings.showCaption}
        className="SRLElementContainer"
        captionDivSizes={captionDivSizes}
        thumbnailsDivSizes={thumbnailsDivSizes}
        {...handlers}
      >
        <AnimatePresence className="SRLAnimatePresence" custom={direction}>
          <SRLElementWrapper
            variants={variants}
            custom={direction}
            initial={
              settings.slideAnimationType === 'slide'
                ? 'slideIn'
                : settings.slideAnimationType === 'both'
                ? 'bothIn'
                : 'fadeIn'
            }
            animate="center"
            exit={
              settings.slideAnimationType === 'slide'
                ? 'slideOut'
                : settings.slideAnimationType === 'both'
                ? 'bothOut'
                : 'fadeOut'
            }
            className="SRLElementWrapper"
            key={id}
            transition={{
              x: {
                type: 'spring',
                stiffness: settings.slideSpringValues[0],
                damping: settings.slideSpringValues[1]
              },
              opacity: { duration: settings.slideTransitionSpeed }
            }}
          >
            {!panzoomEnabled && (
              <SRLImage
                className="SRLImage"
                disablePanzoom={settings.disablePanzoom}
                width={imgWidth}
                height={imgHeight}
                onClick={() => handlePanzoom(true)}
                src={typeof source === 'object' ? 'Loading...' : source}
                alt={caption}
              />
            )}
          </SRLElementWrapper>

          {panzoomEnabled ? (
            <SRLPanzoomedImage
              className="SRLPanzoomImage"
              ref={SRLPanzoomImageRef}
              width={imgWidth}
              height={imgHeight}
              src={typeof source === 'object' ? 'Loading...' : source}
              alt={caption}
            />
          ) : (
            <></>
          )}
        </AnimatePresence>
      </SRLElementContainer>

      {captionSettings.showCaption && (
        <SRLCaptionContainerComponent
          id={id}
          thumbnailsPosition={thumbnails.thumbnailsPosition}
          captionOptions={captionOptions}
          caption={caption}
          SRLCaptionRef={SRLCaptionRef}
        />
      )}

      {thumbnails.showThumbnails && !hideThumbnails && (
        <SRLThumbnailGalleryComponent
          handleCurrentElement={handleCurrentElement}
          thumbnails={thumbnails}
          currentId={id}
          elements={elements || []}
          SRLThumbnailsRef={SRLThumbnailsRef}
        />
      )}
    </SRLContainer>
  )
}

SRLContainerComponent.propTypes = {
  caption: PropTypes.string,
  direction: PropTypes.string,
  elements: PropTypes.array,
  handleCloseLightbox: PropTypes.func,
  handleCurrentElement: PropTypes.func,
  handleNextElement: PropTypes.func,
  handlePanzoom: PropTypes.func,
  handlePrevElement: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string,
  SRLPanzoomImageRef: PropTypes.object,
  SRLCaptionRef: PropTypes.object,
  SRLThumbnailsRef: PropTypes.object,
  hideThumbnails: PropTypes.bool,
  options: PropTypes.shape({
    settings: PropTypes.shape({
      disablePanzoom: PropTypes.bool,
      disableWheelControls: PropTypes.bool,
      slideAnimationType: PropTypes.string,
      slideSpringValues: PropTypes.array,
      slideTransitionSpeed: PropTypes.number,
      slideTransitionTimingFunction: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ])
    }),
    caption: PropTypes.shape({
      captionAlignment: PropTypes.string,
      captionColor: PropTypes.string,
      captionFontFamily: PropTypes.string,
      captionFontSize: PropTypes.string,
      captionFontStyle: PropTypes.string,
      captionFontWeight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      captionContainerPadding: PropTypes.string,
      captionTextTransform: PropTypes.string,
      showCaption: PropTypes.bool
    }),
    thumbnails: PropTypes.shape({
      showThumbnails: PropTypes.bool,
      thumbnailsOpacity: PropTypes.number,
      thumbnailsPosition: PropTypes.string,
      thumbnailsSize: PropTypes.array
    })
  }),
  panzoomEnabled: PropTypes.bool,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  SRLLightboxPanzoomImageRef: PropTypes.object,
  thumbnailsOpacity: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default SRLContainerComponent
