import React from "react";
import PropTypes from "prop-types";
import SRLContext from "./SRL/SRLContext";
import SRLImagesContext from "./SRL/SRLImages";
import SRLLightbox from "./SRL/SRLLightbox";
import { withContext } from "./SRL/SRLHoc"; // REMOVE SOON
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
  overlaycolor,
  showcaption,
  showthumbnails,
  children
}) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <SRLContext
        overlaycolor={overlaycolor}
        showcaption={showcaption}
        showthumbnails={showthumbnails}
      >
        {children}
        <SRLLightbox />
      </SRLContext>
    </React.Fragment>
  );
};

SimpleReactLightbox.propTypes = {
  overlaycolor: PropTypes.string,
  showthumbnails: PropTypes.bool,
  showcaption: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

SRLContext.defaultProps = {
  overlaycolor: "rgba(0, 0, 0, 0.8)",
  showcaption: false,
  showthumbnails: false
};

export { withContext }; // REMOVE SOON
export { SRLImagesContext as SRLImages };
export default SimpleReactLightbox;
