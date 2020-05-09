import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SRLLightboxThubnailGallery from './SRLLightboxThubnailGallery'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useSwipeable } from 'react-swipeable'
import { useDebouncedCallback } from 'use-debounce'
import subscribe from 'subscribe-event'

import {
  SRLLightboxContent,
  SRRLLightboxCaption,
  SRLLightboxElementContainer,
  SRLElementWrapper,
  SRLLightboxImage,
  SRLLightboxPanzoomImage
  // SRLLightboxVideo
} from '../styles'

function SRLLightboxSlideComponent({
  caption,
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
  SRLLightboxPanzoomImageRef,
  width
}) {
  const { settings, thumbnails, caption: captionSettings } = options

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextElement(id),
    onSwipedRight: () => handlePrevElement(id)
  })

  // Debounce callback
  const [debouncedCallback] = useDebouncedCallback(
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

  // Ref for the Content
  const SRLLightboxContentRef = useRef()
  // Ref for the Element
  const SRLElementRef = useRef()

  // Handle scrollwheel
  useEffect(() => {
    if (!panzoomEnabled) {
      const unsubscribe = subscribe(document, 'wheel', (e) =>
        debouncedCallback(e.deltaY)
      )
      return () => {
        unsubscribe()
      }
    }
  }, [debouncedCallback, panzoomEnabled, settings.disableWheelControls])

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
    <SRLLightboxContent
      className="SRLContent"
      onWheel={(e) => debouncedCallback(e)}
      ref={SRLLightboxContentRef}
    >
      <SRLLightboxElementContainer
        showThumbnails={thumbnails.showThumbnails}
        showCaption={captionSettings.showCaption}
        className="SRLElementContainer"
        ref={SRLElementRef}
        {...handlers}
      >
        <TransitionGroup className="SRLTransitionGroup">
          <CSSTransition
            key={id}
            classNames="element-transition"
            timeout={settings.slideTransitionSpeed}
          >
            <SRLElementWrapper
              slideTransitionSpeed={settings.slideTransitionSpeed}
              slideTransitionTimingFunction={
                settings.slideTransitionTimingFunction
              }
              className="SRLElementWrapper"
            >
              {panzoomEnabled ? (
                <SRLLightboxPanzoomImage
                  className="SRLPanzoomImage"
                  ref={SRLLightboxPanzoomImageRef}
                  width={width}
                  height={height}
                  src={typeof source === 'object' ? 'Loading...' : source}
                  alt={caption}
                />
              ) : (
                <SRLLightboxImage
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
          </CSSTransition>
        </TransitionGroup>
      </SRLLightboxElementContainer>

      {captionSettings.showCaption && (
        <SRRLLightboxCaption
          captionStyle={captionOptions}
          className="SRLCaption"
        >
          <p className="SRLCaption">{caption}</p>
        </SRRLLightboxCaption>
      )}

      {thumbnails.showThumbnails && (
        <SRLLightboxThubnailGallery
          handleCurrentElement={handleCurrentElement}
          thumbnailsOpacity={thumbnails.thumbnailsOpacity}
          thumbnailsSize={thumbnails.thumbnailsSize}
          currentId={id}
          elements={elements || []}
        />
      )}
    </SRLLightboxContent>
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
            event.target.classList.contains('panzoom-enabled ') ||
            event.target.classList.contains('element-transition-enter') ||
            event.target.classList.contains(
              'element-transition-enter-active'
            ) ||
            event.target.classList.contains('element-transition-exit') ||
            event.target.classList.contains('element-transition-exit-active') ||
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
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  caption: PropTypes.string,
  elements: PropTypes.array,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleCloseLightbox: PropTypes.func,
  handleCurrentElement: PropTypes.func,
  handleNextElement: PropTypes.func,
  handlePrevElement: PropTypes.func,
  handlePanzoom: PropTypes.func,
  id: PropTypes.string,
  SRLLightboxPanzoomImageRef: PropTypes.object,
  panzoomEnabled: PropTypes.bool,
  thumbnailsOpacity: PropTypes.number,
  options: PropTypes.shape({
    settings: PropTypes.shape({
      disableWheelControls: PropTypes.bool,
      disablePanzoom: PropTypes.bool,
      slideTransitionSpeed: PropTypes.number,
      slideTransitionTimingFunction: PropTypes.string
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
  })
}

export default SRLLightboxSlideComponent
