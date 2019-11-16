import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SRLLightboxThubnailGallery from "./SRLLightboxThubnailGallery";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import {
  SRLLightboxContent,
  SRRLLightboxCaption,
  SRLLightboxElementContainer,
  SRLLightboxImage
} from "../styles";

function SRLLightboxSlideComponent({
  source,
  elements,
  caption,
  id,
  handleCloseLightbox,
  handleCurrentElement,
  handleNextElement,
  handlePrevElement,
  options,
  width,
  height
}) {

  const {showThumbnails, showCaption, transitionSpeed} = options;

  // Light-box captions options
  const captionOptions = {
    captionColor: options.captionColor,
    captionFontFamily: options.captionFontFamily,
    captionFontSize: options.captionFontSize,
    captionFontStyle: options.captionFontStyle,
    captionFontWeight: options.captionFontWeight,
  }

  const SRLElementContainerRef = useRef();

  // credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
  let startX;
  let startY;
  let distX;
  let distY;
  const threshold = 150; // required min distance traveled to be considered swipe
  const restraint = 100; // maximum distance allowed at the same time in perpendicular direction
  const allowedTime = 300; // maximum time allowed to travel that distance
  let elapsedTime;
  let startTime;

  function handleTouchChange(x, y, t, r) {
    // FIRST CONDITION
    /* This is, in a way, a method to check if the action is a Swipe...
       if the finger is held by more than 400 milliseconds, maybe that wasn't a swipe */
    if (elapsedTime <= allowedTime) {
      // SECOND CONDITION
      if (Math.abs(x) >= t) {
        if (x <= 0) {
          handleNextElement(id);
        } else if (x >= 0) {
          handlePrevElement(id);
        }
      }
    }
  }

  function handleTouchStart(e) {
    const touchObject = e.changedTouches[0];
    startX = touchObject.pageX;
    startY = touchObject.pageY;
    startTime = new Date().getTime();
  }

  function handleTouchEnd(e) {
    const touchObject = e.changedTouches[0];
    distX = touchObject.pageX - startX;
    distY = touchObject.pageX - startY;
    elapsedTime = new Date().getTime() - startTime;

    // Run the function on touchend
    handleTouchChange(distX, distY, threshold, restraint);
  }

  useOnClickOutside(SRLElementContainerRef, () => handleCloseLightbox());


  // Check if it's an image to load the right content
  const isImage = (/\.(gif|jpg|jpeg|tiff|png|webp)$/i).test(source);

  return (
    <SRLLightboxContent className="SRLContent">
      <SRLLightboxElementContainer
        showThumbnails={showThumbnails}
        showCaption={showCaption}
        className="SRLElementContainer"
        onTouchStart={e => handleTouchStart(e)}
        onTouchEnd={e => handleTouchEnd(e)}
      >
        <ReactScrollWheelHandler
          upHandler={() => handleNextElement(id)}
          downHandler={() => handlePrevElement(id)}
          disableKeyboard={true}
        >
          <TransitionGroup className="SRLTransitionGroup">
            <CSSTransition
              key={id}
              classNames="image-transition"
              timeout={transitionSpeed}
            >
              {isImage ?
                <SRLLightboxImage
                  ref={SRLElementContainerRef}
                  className="SRLImage"
                  transitionSpeed={transitionSpeed}
                  width={width}
                  height={height}
                  src={
                    typeof source === "object"
                      ? "Loading..."
                      : source
                  }
                  alt={caption}
                />
              : <div>Video</div>}
            </CSSTransition>
          </TransitionGroup>
        </ReactScrollWheelHandler>
      </SRLLightboxElementContainer>

      {showCaption && (
        <SRRLLightboxCaption captionStyle={captionOptions} className="SRLCaption">
          <p className="SRLCaption">{caption}</p>
        </SRRLLightboxCaption>
      )}

      {showThumbnails && (
        <SRLLightboxThubnailGallery
          handleCurrentElement={handleCurrentElement}
          currentId={id}
          elements={elements || []}
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
            event.target.classList.contains("SRLExpandButton") ||
            event.target.classList.contains("SRLThumbnails") ||
            event.target.classList.contains("SRLThumb") ||
            event.target.classList.contains("SRLCaption") ||
            event.target.classList.contains("react-transform-component") ||
            event.target.classList.contains("react-transform-element") ||
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
  elements: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  handleCloseLightbox: PropTypes.func,
  handleCurrentElement: PropTypes.func,
  handleNextElement: PropTypes.func,
  handlePrevElement: PropTypes.func,
  id: PropTypes.string,
  options: PropTypes.shape({
    overlayColor: PropTypes.string,
    transitionSpeed: PropTypes.number,
    transitionTimingFunction: PropTypes.string,
    autoplaySpeed: PropTypes.number,
    slidesTransitionSpeed: PropTypes.number,
    showThumbnails: PropTypes.bool,
    showCaption: PropTypes.bool,
    captionColor: PropTypes.string,
    captionFontFamily: PropTypes.string,
    captionFontSize: PropTypes.string,
    captionFontWeight: PropTypes.string,
    captionFontStyle: PropTypes.string,
    buttonsBackgroundColor: PropTypes.string,
    buttonsIconColor: PropTypes.string,
    buttonsIconPadding: PropTypes.string,
    buttonsSize: PropTypes.string,
  }),
};

export default SRLLightboxSlideComponent;
