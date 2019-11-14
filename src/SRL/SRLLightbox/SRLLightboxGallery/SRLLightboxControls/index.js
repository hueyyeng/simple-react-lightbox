import React from "react";
import PropTypes from "prop-types";
import {
  SRRLLightboxCloseIcon,
  SRLLightboxNextIcon,
  SRLLightboxPrevIcon,
  SRRLLightboxAutoplayIcon
} from "../styles";

const SRLLightboxControls = ({
  handleCloseLightbox,
  handleNextElement,
  handlePrevElement,
  autoplay,
  autoplaySpeed,
  setAutoplay,
  currentElementID,
  buttonsBackgroundColor,
  buttonsIconColor,
  buttonsSize,
  buttonsIconPadding

}) => {
  return (
    <>
      <SRRLLightboxAutoplayIcon
        buttonsBackgroundColor={buttonsBackgroundColor}
        buttonsIconColor={buttonsIconColor}
        buttonsSize={buttonsSize}
        buttonsIconPadding={buttonsIconPadding}
        autoplaySpeed={autoplaySpeed}
        title="Autoplay"
        className="SRLAutoplayButton"
        onClick={() => setAutoplay(!autoplay)}
      >
        <div className="SRLAutoplayButton">
          {!autoplay ? (
            <svg
              className="SRLAutoplayButton"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
            >
              <path
                className="SRLAutoplayButton"
                d="M35.7 22.8L16.9 11.6c-1.5-.9-3.9 0-3.9 2.2v22.3c0 2 2.2 3.2 3.9 2.2l18.9-11.1c1.6-1 1.6-3.4-.1-4.4zm-.8 2.9L16 36.9c-.6.3-1.3-.1-1.3-.7V13.8c0-.9.9-1 1.3-.7l18.9 11.1c.5.4.5 1.2 0 1.5z"
              />
            </svg>
          ) : (
            <svg
              className="SRLAutoplayButton"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
            >
              <path
                className="SRLAutoplayButton"
                d="M14.2 38.7h5.9c1.6 0 2.9-1.3 2.9-2.9V14.2c0-1.6-1.3-2.9-2.9-2.9h-5.9c-1.6 0-2.9 1.3-2.9 2.9v21.6c0 1.6 1.3 2.9 2.9 2.9zm-1-24.5c0-.5.4-1 1-1h5.9c.5 0 1 .4 1 1v21.6c0 .5-.4 1-1 1h-5.9c-.5 0-1-.4-1-1V14.2zm16.7 24.5h5.9c1.6 0 2.9-1.3 2.9-2.9V14.2c0-1.6-1.3-2.9-2.9-2.9h-5.9c-1.6 0-2.9 1.3-2.9 2.9v21.6c0 1.6 1.3 2.9 2.9 2.9zm-1-24.5c0-.5.4-1 1-1h5.9c.5 0 1 .4 1 1v21.6c0 .5-.4 1-1 1h-5.9c-.5 0-1-.4-1-1V14.2z"
              />
            </svg>
          )}
        </div>
      </SRRLLightboxAutoplayIcon>
      <SRRLLightboxCloseIcon
        buttonsBackgroundColor={buttonsBackgroundColor}
        buttonsIconColor={buttonsIconColor}
        buttonsSize={buttonsSize}
        buttonsIconPadding={buttonsIconPadding}
        title="Close"
        className="SRLCloseButton"
        onClick={() => handleCloseLightbox()}
      >
        <div className="SRLCloseButton">
          <svg
            className="SRLCloseButton"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path
              className="SRLPrevButton"
              d="M27.92 25l8.84-8.84 1.82-1.82c.27-.27.27-.71 0-.97l-1.95-1.95a.682.682 0 0 0-.97 0L25 22.08 14.34 11.42a.682.682 0 0 0-.97 0l-1.95 1.95c-.27.27-.27.71 0 .97L22.08 25 11.42 35.66c-.27.27-.27.71 0 .97l1.95 1.95c.27.27.71.27.97 0L25 27.92l8.84 8.84 1.82 1.82c.27.27.71.27.97 0l1.95-1.95c.27-.27.27-.71 0-.97L27.92 25z"
            />
          </svg>
        </div>
      </SRRLLightboxCloseIcon>
      <SRLLightboxNextIcon
        buttonsBackgroundColor={buttonsBackgroundColor}
        buttonsIconColor={buttonsIconColor}
        buttonsSize={buttonsSize}
        buttonsIconPadding={buttonsIconPadding}
        title="Next"
        className="SRLNextButton"
        onClick={() => handleNextElement(currentElementID)}
      >
        <div className="SRLNextButton">
          <svg
            className="SRLNextButton"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path
              className="SRLPrevButton"
              d="M24.53 11.36l-.44.44c-.29.29-.29.76 0 1.05l11.09 11.09H11.83c-.41 0-.75.33-.75.75v.62c0 .41.33.75.75.75h23.35L24.09 37.14c-.29.29-.29.76 0 1.05l.44.44c.29.29.76.29 1.05 0l13.11-13.11c.29-.29.29-.76 0-1.05l-13.1-13.11a.754.754 0 0 0-1.06 0z"
            />
          </svg>
        </div>
      </SRLLightboxNextIcon>
      <SRLLightboxPrevIcon
        buttonsBackgroundColor={buttonsBackgroundColor}
        buttonsIconColor={buttonsIconColor}
        buttonsSize={buttonsSize}
        buttonsIconPadding={buttonsIconPadding}
        title="Previous"
        className="SRLPrevButton"
        onClick={() => handlePrevElement(currentElementID)}
      >
        <div className="SRLPrevButton">
          <svg
            className="SRLPrevButton"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path
              className="SRLPrevButton"
              d="M25.47 38.64l.44-.44c.29-.29.29-.76 0-1.05L14.82 26.06h23.35c.41 0 .75-.33.75-.75v-.62c0-.41-.33-.75-.75-.75H14.82l11.09-11.09c.29-.29.29-.76 0-1.05l-.44-.44a.742.742 0 0 0-1.05 0L11.31 24.47c-.29.29-.29.76 0 1.05l13.11 13.11c.29.3.76.3 1.05.01z"
            />
          </svg>
        </div>
      </SRLLightboxPrevIcon>
    </>
  );
};

export default SRLLightboxControls;

SRLLightboxControls.propTypes = {
  handleCloseLightbox: PropTypes.func,
  handleNextElement: PropTypes.func,
  handlePrevElement: PropTypes.func,
  setAutoplay: PropTypes.func,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  currentElementID: PropTypes.string,
  buttonsBackgroundColor: PropTypes.string,
  buttonsIconColor: PropTypes.string,
  buttonsSize: PropTypes.string,
  buttonsIconPadding: PropTypes.string,
};
