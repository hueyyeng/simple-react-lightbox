import React from "react";
import PropTypes from "prop-types";
import SRLContextComponent from "./SRL/SRLContext";
import SRLImages from "./SRL/SRLImages";
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
  overlaycolor,
  showcaption,
  showthumbnails,
  children
}) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <SRLContextComponent
        overlaycolor={overlaycolor}
        showcaption={showcaption}
        showthumbnails={showthumbnails}>
        {children}
        <SRLLightbox />
      </SRLContextComponent>
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

SRLContextComponent.defaultProps = {
  overlaycolor: "rgba(0, 0, 0, 0.8)",
  showcaption: false,
  showthumbnails: false
};

export { withSRLContext };
export { SRLImages };
export default SimpleReactLightbox;
