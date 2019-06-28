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
  showCaption
}) {
  const SRLImageContainerRef = useRef();
  const [touchPosition, setTouchPosition] = useState({
    startClientX: 0,
    endClientX: 0
  });

  // Touch Events
  const handleTouchStart = event => {
    setTouchPosition({
      ...touchPosition,
      startClientX: event.touches[0].clientX
    });
  };

  const handleTouchEnd = event => {
    setTouchPosition({
      ...touchPosition,
      endClientX: event.changedTouches[0].clientX
    });
    if (
      touchPosition.startClientX > touchPosition.endClientX &&
      touchPosition.endClientX < touchPosition.startClientX - 100
    ) {
      handleNextImage(id);
    } else if (
      touchPosition.startClientX < touchPosition.endClientX &&
      touchPosition.endClientX > touchPosition.startClientX + 100
    ) {
      handlePrevImage(id);
    }
  };

  useOnClickOutside(SRLImageContainerRef, () => handleCloseLightbox());

  return (
    <SRLLightboxContent className="SRLContent">
      <SRLLightboxImageContainer
        showThumbnails={showThumbnails}
        showCaption={showCaption}
        className="SRLImageContainer"
      >
        <ReactScrollWheelHandler
          upHandler={() => handleNextImage(id)}
          downHandler={() => handlePrevImage(id)}
          disableKeyboard={true}
        >
          <TransitionGroup className="SRLTransitionGroup">
            <CSSTransition key={id} classNames="image-transition" timeout={800}>
              <SRLLightboxImage
                onTouchStart={e => handleTouchStart(e)}
                onTouchEnd={e => handleTouchEnd(e)}
                ref={SRLImageContainerRef}
                className="SRLImage"
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
  images: PropTypes.array,
  handleCloseLightbox: PropTypes.func,
  handleCurrentImage: PropTypes.func,
  handleNextImage: PropTypes.func,
  handlePrevImage: PropTypes.func,
  id: PropTypes.string
};

export default SRLLightboxSlideComponent;
