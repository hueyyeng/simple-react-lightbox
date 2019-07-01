import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SRLLightboxThubnailGallery from "./SRLLightboxThubnailGallery";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

import {
  SRLLightboxContent,
  SRRLLightboxCaption,
  SRLLightboxImageContainer,
  SRLLightboxImage
} from "../styles";

function SRLLightboxSlideComponent({
  source,
  images,
  id,
  handleCloseLightbox,
  handleCurrentImage,
  handleNextImage,
  handlePrevImage,
  caption,
  captionColor,
  showThumbnails,
  showCaption,
  transitionSpeed
}) {
  console.log(transitionSpeed);
  const SRLImageContainerRef = useRef();
  const [touchState, setTouchState] = useState({
    startX: 0,
    startY: 0,
    distX: 0,
    distY: 0,
    threshold: 150, // required min distance traveled to be considered swipe
    restraint: 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime: 300, // maximum time allowed to travel that distance
    startTime: 0,
    elapsedTime: 0
  });

  function handleTouchStart(e) {
    let touchObject = e.changedTouches[0];
    setTouchState({
      ...touchState,
      startX: touchObject.pageX,
      startY: touchObject.pageY,
      startTime: new Date().getTime()
    });
  }

  function handleTouchEnd(e) {
    let touchObject = e.changedTouches[0];
    let {
      startX,
      startY,
      startTime,
      distX,
      distY,
      elapsedTime,
      allowedTime,
      threshold,
      restraint
    } = touchState;
    setTouchState({
      ...touchState,
      distX: touchObject.pageX - startX,
      distY: touchObject.pageY - startY,
      elapsedTime: new Date().getTime() - startTime
    });
    // This is, in a way, a method to check if the action is a Swipe...
    // if the finger is held by more than 400 milliseconds, maybe that wasn't a swipe
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distY < 0) {
          handlePrevImage(id);
        } else if (distY > 0) {
          handleNextImage(id);
        }
      }
    }
  }

  useOnClickOutside(SRLImageContainerRef, () => handleCloseLightbox());

  return (
    <SRLLightboxContent className="SRLContent">
      <SRLLightboxImageContainer
        showThumbnails={showThumbnails}
        showCaption={showCaption}
        className="SRLImageContainer"
        onTouchStart={e => handleTouchStart(e)}
        onTouchEnd={e => handleTouchEnd(e)}>
        <ReactScrollWheelHandler
          upHandler={() => handleNextImage(id)}
          downHandler={() => handlePrevImage(id)}
          disableKeyboard={true}>
          <TransitionGroup className="SRLTransitionGroup">
            <CSSTransition
              key={id}
              classNames="image-transition"
              timeout={transitionSpeed}>
              <SRLLightboxImage
                ref={SRLImageContainerRef}
                className="SRLImage"
                transitionSpeed={transitionSpeed}
                src={source}
                alt={caption}
              />
            </CSSTransition>
          </TransitionGroup>
        </ReactScrollWheelHandler>
      </SRLLightboxImageContainer>

      {showCaption && (
        <SRRLLightboxCaption captionColor={captionColor} className="SRLCaption">
          <p className="SRLCaption">{caption}</p>
        </SRRLLightboxCaption>
      )}

      {showThumbnails && (
        <SRLLightboxThubnailGallery
          handleCurrentImage={handleCurrentImage}
          currentId={id}
          images={images || []}
        />
      )}
    </SRLLightboxContent>
  );
  // Hook

  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
          if (
            !ref.current ||
            ref.current.contains(event.target) ||
            event.target.classList.contains("SRLNextButton") ||
            event.target.classList.contains("SRLPrevButton") ||
            event.target.classList.contains("SRLCloseButton") ||
            event.target.classList.contains("SRLAutoplayButton") ||
            event.target.classList.contains("SRLThumbnails") ||
            event.target.classList.contains("SRLThumb") ||
            event.target.classList.contains("SRLCaption") ||
            event.type === "touchstart" ||
            event.button !== 0
          ) {
            return;
          }

          handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
}

SRLLightboxSlideComponent.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  caption: PropTypes.string,
  captionColor: PropTypes.string,
  showThumbnails: PropTypes.bool,
  showCaption: PropTypes.bool,
  transitionSpeed: PropTypes.number,
  images: PropTypes.array,
  handleCloseLightbox: PropTypes.func,
  handleCurrentImage: PropTypes.func,
  handleNextImage: PropTypes.func,
  handlePrevImage: PropTypes.func,
  id: PropTypes.string
};

export default SRLLightboxSlideComponent;
