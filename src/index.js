import React from "react";
import PropTypes from "prop-types";
import SRLContextComponent from "./SRL/SRLContext";
import SRLWrapper from "./SRL/SRLWrapper";
import SRLLightbox from "./SRL/SRLLightbox";
import { withSRLContext } from "./SRL/SRLHoc";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    #lightbox {
      width: 0;
      height: 0;
    }
    &.SRLOpened {
      overflow: hidden;
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
`;

const SimpleReactLightbox = ({
  overlayColor,
  showCaption,
  showThumbnails,
  captionColor,
  buttonsBackgroundColor,
  buttonsIconColor,
  autoplaySpeed,
  transitionSpeed,
  children
}) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <SRLContextComponent
        overlayColor={overlayColor}
        showCaption={showCaption}
        showThumbnails={showThumbnails}
        captionColor={captionColor}
        buttonsBackgroundColor={buttonsBackgroundColor}
        buttonsIconColor={buttonsIconColor}
        autoplaySpeed={autoplaySpeed}
        transitionSpeed={transitionSpeed}
      >
        {children}
        <SRLLightbox />
      </SRLContextComponent>
    </React.Fragment>
  );
};

SimpleReactLightbox.propTypes = {
  overlayColor: PropTypes.string,
  captionColor: PropTypes.string,
  buttonsBackgroundColor: PropTypes.string,
  buttonsIconColor: PropTypes.string,
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
  overlayColor: "rgba(0, 0, 0, 0.8)",
  captionColor: "#FFFFFF",
  buttonsBackgroundColor: "rgba(30,30,36,0.8)",
  buttonsIconColor: "rgba(255, 255, 255, 0.8)",
  autoplaySpeed: 3000,
  transitionSpeed: 600,
  showCaption: true,
  showThumbnails: true
};

export { withSRLContext };
export { SRLWrapper };
export default SimpleReactLightbox;
