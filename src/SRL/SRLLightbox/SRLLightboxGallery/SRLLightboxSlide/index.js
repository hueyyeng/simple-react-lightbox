import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SRLLightboxThubnailGallery from './SRLLightboxThubnailGallery'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useSwipeable } from 'react-swipeable'
import { useDebouncedCallback } from 'use-debounce'

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
  const {
    enablePanzoom,
    showCaption,
    showThumbnails,
    slideTransitionSpeed,
    thumbnailsOpacity,
    thumbnailsSize
  } = options

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextElement(id),
    onSwipedRight: () => handlePrevElement(id)
  })

  // Debounce callback
  const [debouncedCallback] = useDebouncedCallback(
    // function
    (e) => {
      if (e.deltaY > 0) {
        handleNextElement(id)
      } else if (e.deltaY < 0) {
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
      document.addEventListener('wheel', debouncedCallback)
      return () => {
        document.removeEventListener('wheel', debouncedCallback)
      }
    }
  }, [debouncedCallback, panzoomEnabled])

  // UseOnClickOutside
  useOnClickOutside(SRLElementRef, () => handleCloseLightbox())

  // // Check if it's an image to load the right content
  // const isImage = /\.(gif|jpg|jpeg|tiff|png|webp)$/i.test(source)

  // Light-box captions options
  const captionOptions = {
    captionColor: options.captionColor,
    captionFontFamily: options.captionFontFamily,
    captionFontSize: options.captionFontSize,
    captionFontStyle: options.captionFontStyle,
    captionFontWeight: options.captionFontWeight
  }

  return (
    <SRLLightboxContent
      className="SRLContent"
      onWheel={(e) => debouncedCallback(e)}
      ref={SRLLightboxContentRef}
      {...handlers}
    >
      <SRLLightboxElementContainer
        showThumbnails={showThumbnails}
        showCaption={showCaption}
        className="SRLElementContainer"
        ref={SRLElementRef}
      >
        <TransitionGroup className="SRLTransitionGroup">
          <CSSTransition
            key={id}
            classNames="element-transition"
            timeout={slideTransitionSpeed}
          >
            <SRLElementWrapper
              transitionSpeed={slideTransitionSpeed}
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
                  enablePanzoom={enablePanzoom}
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

      {showCaption && (
        <SRRLLightboxCaption
          captionStyle={captionOptions}
          className="SRLCaption"
        >
          <p className="SRLCaption">{caption}</p>
        </SRRLLightboxCaption>
      )}

      {showThumbnails && (
        <SRLLightboxThubnailGallery
          handleCurrentElement={handleCurrentElement}
          thumbnailsOpacity={thumbnailsOpacity}
          thumbnailsSize={thumbnailsSize}
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
  width: PropTypes.number,
  height: PropTypes.number,
  handleCloseLightbox: PropTypes.func,
  handleCurrentElement: PropTypes.func,
  handleNextElement: PropTypes.func,
  handlePrevElement: PropTypes.func,
  handlePanzoom: PropTypes.func,
  id: PropTypes.string,
  SRLLightboxPanzoomImageRef: PropTypes.object,
  panzoomEnabled: PropTypes.bool,
  enablePanzoom: PropTypes.bool,
  thumbnailsOpacity: PropTypes.number,
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    buttonsBackgroundColor: PropTypes.string,
    buttonsIconColor: PropTypes.string,
    buttonsIconPadding: PropTypes.string,
    buttonsSize: PropTypes.string,
    captionColor: PropTypes.string,
    captionFontFamily: PropTypes.string,
    captionFontSize: PropTypes.string,
    captionFontStyle: PropTypes.string,
    captionFontWeight: PropTypes.string,
    enablePanzoom: PropTypes.bool,
    overlayColor: PropTypes.string,
    showCaption: PropTypes.bool,
    showThumbnails: PropTypes.bool,
    showDownloadButton: PropTypes.bool,
    slideTransitionSpeed: PropTypes.number,
    thumbnailsOpacity: PropTypes.number,
    thumbnailsSize: PropTypes.array,
    transitionSpeed: PropTypes.number,
    transitionTimingFunction: PropTypes.string
  })
}

export default SRLLightboxSlideComponent
