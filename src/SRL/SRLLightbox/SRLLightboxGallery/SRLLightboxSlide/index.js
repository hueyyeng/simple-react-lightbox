import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SRLThumbnailGalleryComponent from './SRLThumbnailGallery'
import SRLCaptionContainerComponent from './SRLCaption'
import { useSwipeable } from 'react-swipeable'
import { useDebouncedCallback } from 'use-debounce'
import subscribe from 'subscribe-event'
import { AnimatePresence } from 'framer-motion'

import {
  SRLContent,
  SRLElementContainer,
  SRLElementWrapper,
  SRLImage,
  SRLPanzoomedImage
  // SRLLightboxVideo
} from '../styles'

function SRLLightboxSlideComponent({
  caption,
  direction,
  elements,
  handleCloseLightbox,
  handleCurrentElement,
  handleNextElement,
  handlePanzoom,
  handlePrevElement,
  height,
  id,
  options,
  panzoomEnabled,
  source,
  SRLPanzoomImageRef,
  width
}) {
  const { settings, thumbnails, caption: captionSettings } = options

  // Ref for the Content
  const SRLLightboxContentRef = useRef()
  // Ref for the Element
  const SRLElementRef = useRef()

  const variants = {
    slideIn: (direction) => {
      return {
        x:
          direction === undefined
            ? '0'
            : direction === 'next'
            ? '150vw'
            : '-150vw'
      }
    },
    slideOut: (direction) => {
      return {
        x: direction === 'previous' ? '150vw' : '-150vw'
      }
    },
    fadeIn: {
      opacity: 0
    },
    fadeOut: {
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    }
  }

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextElement(id),
    onSwipedRight: () => handlePrevElement(id)
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

  // Handle scrollwheel
  useEffect(() => {
    if (!panzoomEnabled) {
      const addWheelListener = subscribe(document, 'wheel', (e) =>
        handleScrollWheel(e.deltaY)
      )
      return () => {
        addWheelListener()
      }
    }
  }, [handleScrollWheel, panzoomEnabled, settings.disableWheelControls])

  // UseOnClickOutside
  useOnClickOutside(SRLElementRef, () => handleCloseLightbox())

  // // Check if it's an image to load the right content
  // const isImage = /\.(gif|jpg|jpeg|tiff|png|webp)$/i.test(source)

  // Light-box captions options
  const captionOptions = {
    captionColor: options.caption.captionColor,
    captionFontFamily: options.caption.captionFontFamily,
    captionFontSize: options.caption.captionFontSize,
    captionFontStyle: options.caption.captionFontStyle,
    captionFontWeight: options.caption.captionFontWeight,
    captionTextTransform: options.caption.captionTextTransform
  }

  return (
    <SRLContent className="SRLContent" ref={SRLLightboxContentRef}>
      <SRLElementContainer
        showThumbnails={thumbnails.showThumbnails}
        showCaption={captionSettings.showCaption}
        className="SRLElementContainer"
        ref={SRLElementRef}
        {...handlers}
      >
        <AnimatePresence className="SRLTransitionGroup" custom={direction}>
          <SRLElementWrapper
            variants={variants}
            custom={direction}
            initial={
              settings.slideAnimationType === 'slide' ? 'slideIn' : 'fadeIn'
            }
            animate="center"
            exit={
              settings.slideAnimationType === 'slide' ? 'slideOut' : 'fadeOut'
            }
            className="SRLElementWrapper"
            key={id}
            transition={{
              x: {
                type: 'spring',
                stiffness: settings.slideSpringValues[0],
                damping: settings.slideSpringValues[1]
              },
              opacity: { duration: settings.slideTransitionSpeed },
              ease: settings.slideTransitionTimingFunction
            }}
          >
            {!panzoomEnabled && (
              <SRLImage
                className="SRLImage"
                disablePanzoom={settings.disablePanzoom}
                width={width}
                height={height}
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
              width={width}
              height={height}
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
          captionOptions={captionOptions}
          caption={caption}
        />
      )}

      {thumbnails.showThumbnails && (
        <SRLThumbnailGalleryComponent
          handleCurrentElement={handleCurrentElement}
          thumbnailsOpacity={thumbnails.thumbnailsOpacity}
          thumbnailsSize={thumbnails.thumbnailsSize}
          currentId={id}
          elements={elements || []}
        />
      )}
    </SRLContent>
  )

  // Hook
  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (
            !ref.current ||
            ref.current.contains(event.target) ||
            event.target.classList.contains('SRLNextButton') ||
            event.target.classList.contains('SRLPrevButton') ||
            event.target.classList.contains('SRLCloseButton') ||
            event.target.classList.contains('SRLAutoplayButton') ||
            event.target.classList.contains('SRLExpandButton') ||
            event.target.classList.contains('SRLZoomOutButton') ||
            event.target.classList.contains('SRLDownloadButton') ||
            event.target.classList.contains('SRLThumbnails') ||
            event.target.classList.contains('SRLThumb') ||
            event.target.classList.contains('SRLCaption') ||
            event.type === 'touchstart' ||
            event.button !== 0
          ) {
            return
          }
          handler(event)
        }
        if (typeof window !== 'undefined') {
          document.addEventListener('mousedown', listener)
          document.addEventListener('touchstart', listener)
        }

        return () => {
          if (typeof window !== 'undefined') {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
          }
        }
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    )
  }
}

SRLLightboxSlideComponent.propTypes = {
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
  options: PropTypes.shape({
    settings: PropTypes.shape({
      disableWheelControls: PropTypes.bool,
      disablePanzoom: PropTypes.bool,
      slideAnimationType: PropTypes.string,
      slideTransitionSpeed: PropTypes.number,
      slideTransitionTimingFunction: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      slideSpringValues: PropTypes.array
    }),
    caption: PropTypes.shape({
      showCaption: PropTypes.bool,
      captionColor: PropTypes.string,
      captionFontFamily: PropTypes.string,
      captionFontSize: PropTypes.string,
      captionFontStyle: PropTypes.string,
      captionFontWeight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      captionTextTransform: PropTypes.string
    }),
    thumbnails: PropTypes.shape({
      showThumbnails: PropTypes.bool,
      thumbnailsOpacity: PropTypes.number,
      thumbnailsSize: PropTypes.array
    })
  }),
  panzoomEnabled: PropTypes.bool,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  SRLLightboxPanzoomImageRef: PropTypes.object,
  thumbnailsOpacity: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default SRLLightboxSlideComponent
