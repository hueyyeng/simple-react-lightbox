import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SRLLightboxThubnailGallery from './SRLLightboxThubnailGallery'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler'

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
  SRLElementPanzoomRef,
  width
}) {
  const {
    enablePanzoom,
    showCaption,
    showThumbnails,
    slideTransitionSpeed,
    thumbnailsOpacity
  } = options

  // Ref for the Element
  const SRLElementRef = useRef()

  // Light-box captions options
  const captionOptions = {
    captionColor: options.captionColor,
    captionFontFamily: options.captionFontFamily,
    captionFontSize: options.captionFontSize,
    captionFontStyle: options.captionFontStyle,
    captionFontWeight: options.captionFontWeight
  }

  // credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
  let startX
  let startY
  let distX
  let distY
  const threshold = 150 // required min distance traveled to be considered swipe
  const restraint = 100 // maximum distance allowed at the same time in perpendicular direction
  const allowedTime = 300 // maximum time allowed to travel that distance
  let elapsedTime
  let startTime

  function handleTouchChange(x, y, t, r) {
    // FIRST CONDITION
    /* This is, in a way, a method to check if the action is a Swipe...
       if the finger is held by more than 400 milliseconds, maybe that wasn't a swipe */
    if (elapsedTime <= allowedTime) {
      // SECOND CONDITION
      if (Math.abs(x) >= t) {
        if (x <= 0) {
          handleNextElement(id)
        } else if (x >= 0) {
          handlePrevElement(id)
        }
      }
    }
  }

  function handleTouchStart(e) {
    const touchObject = e.changedTouches[0]
    startX = touchObject.pageX
    startY = touchObject.pageY
    startTime = new Date().getTime()
  }

  function handleTouchEnd(e) {
    const touchObject = e.changedTouches[0]
    distX = touchObject.pageX - startX
    distY = touchObject.pageX - startY
    elapsedTime = new Date().getTime() - startTime

    // Run the function on touchend
    handleTouchChange(distX, distY, threshold, restraint)
  }

  // UseOnClickOutside
  useOnClickOutside(SRLElementRef, () => handleCloseLightbox())

  // // Check if it's an image to load the right content
  // const isImage = /\.(gif|jpg|jpeg|tiff|png|webp)$/i.test(source)

  return (
    <SRLLightboxContent className="SRLContent">
      <SRLLightboxElementContainer
        showThumbnails={showThumbnails}
        showCaption={showCaption}
        className="SRLElementContainer"
        onTouchStart={e => handleTouchStart(e)}
        onTouchEnd={e => handleTouchEnd(e)}
        ref={SRLElementRef}
      >
        <ReactScrollWheelHandler
          upHandler={() => handleNextElement(id)}
          downHandler={() => handlePrevElement(id)}
          disableKeyboard={true}
          pauseListeners={panzoomEnabled}
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
                    ref={SRLElementPanzoomRef}
                    width={width}
                    height={height}
                    onClick={handlePanzoom}
                    src={typeof source === 'object' ? 'Loading...' : source}
                    alt={caption}
                  />
                ) : (
                  <SRLLightboxImage
                    className="SRLImage"
                    enablePanzoom={enablePanzoom}
                    width={width}
                    height={height}
                    onClick={handlePanzoom}
                    src={typeof source === 'object' ? 'Loading...' : source}
                    alt={caption}
                  />
                )}
              </SRLElementWrapper>
            </CSSTransition>
          </TransitionGroup>
        </ReactScrollWheelHandler>
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
        const listener = event => {
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

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
          document.removeEventListener('mousedown', listener)
          document.removeEventListener('touchstart', listener)
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
  SRLElementPanzoomRef: PropTypes.object,
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
    slideTransitionSpeed: PropTypes.number,
    thumbnailsOpacity: PropTypes.number,
    transitionSpeed: PropTypes.number,
    transitionTimingFunction: PropTypes.string
  })
}

export default SRLLightboxSlideComponent
