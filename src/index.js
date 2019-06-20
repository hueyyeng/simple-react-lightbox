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
  overlayColor,
  showCaption,
  showThumbnails,
  children
}) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <SRLContext
        overlayColor={overlayColor || "rgba(0, 0, 0, 0.8)"}
        showCaption={showCaption || false}
        showThumbnails={showThumbnails || false}>
        {children}
        <SRLLightbox />
      </SRLContext>
    </React.Fragment>
  );
};

SimpleReactLightbox.propTypes = {
  overlayColor: PropTypes.string,
  showThumbnails: PropTypes.bool,
  showCaption: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { withContext }; // REMOVE SOON
export { SRLImagesContext as SRLImages };
export default SimpleReactLightbox;
