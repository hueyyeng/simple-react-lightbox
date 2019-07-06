import React from "react";
import PropTypes from "prop-types";
import SRLContextComponent from "./SRL/SRLContext";
import SRLWrapper from "./SRL/SRLWrapper";
import SRLLightbox from "./SRL/SRLLightbox";
import { withSRLContext } from "./SRL/SRLHoc";
import { Global, css } from "@emotion/core";

const SimpleReactLightbox = ({
  overlayColor,
  showCaption,
  showThumbnails,
  captionStyle,
  buttonsStyle,
  autoplaySpeed,
  transitionSpeed,
  children
}) => {
  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            #lightbox {
              width: 0;
              height: 0;
            }
            &.SRLOpened {
              overflow: hidden;
              /* Compensate for the scrollbar when overflow is hidden */
              margin-right: 15px;
              #lightbox {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
              }
            }
          }
        `}
      />
      <SRLContextComponent
        overlayColor={overlayColor}
        showCaption={showCaption}
        showThumbnails={showThumbnails}
        captionStyle={captionStyle}
        buttonsStyle={buttonsStyle}
        autoplaySpeed={autoplaySpeed}
        transitionSpeed={transitionSpeed}>
        {children}
        <SRLLightbox />
      </SRLContextComponent>
    </React.Fragment>
  );
};

SimpleReactLightbox.propTypes = {
  overlayColor: PropTypes.string,
  captionStyle: PropTypes.shape({
    captionColor: PropTypes.string,
    captionFontFamily: PropTypes.string,
    captionFontSize: PropTypes.string,
    captionFontWeight: PropTypes.string,
    captionFontStyle: PropTypes.string
  }),
  buttonsStyle: PropTypes.shape({
    buttonsBackgroundColor: PropTypes.string,
    buttonsIconColor: PropTypes.string
  }),
  autoplaySpeed: PropTypes.number,
  transitionSpeed: PropTypes.number,
  showThumbnails: PropTypes.bool,
  showCaption: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

SRLContextComponent.defaultProps = {
  overlayColor: "rgba(0, 0, 0, 0.9)",
  captionStyle: {
    captionColor: "#FFFFFF",
    captionFontFamily: "inherit",
    captionFontSize: "inherit",
    captionFontWeight: "inherit",
    captionFontStyle: "inherit"
  },
  buttonsStyle: {
    buttonsBackgroundColor: "rgba(30,30,36,0.8)",
    buttonsIconColor: "rgba(255, 255, 255, 0.8)"
  },
  autoplaySpeed: 3000,
  transitionSpeed: 600,
  showCaption: true,
  showThumbnails: true
};

export { withSRLContext };
export { SRLWrapper };
export default SimpleReactLightbox;
