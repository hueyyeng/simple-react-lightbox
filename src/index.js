import React from "react";
import PropTypes from "prop-types";
import SRLContextComponent from "./SRL/SRLContext";
import SRLWrapper from "./SRL/SRLWrapper";
import SRLLightbox from "./SRL/SRLLightbox";
import { withSRLContext } from "./SRL/SRLHoc";
import { Global, css } from "@emotion/core";

const SimpleReactLightbox = ({ children }) => {
  return (
    <>
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
              #SRLLightbox {
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
      <SRLContextComponent>
        {children}
        <SRLLightbox />
      </SRLContextComponent>
    </>
  );
};

SimpleReactLightbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { withSRLContext };
export { SRLWrapper };
export default SimpleReactLightbox;
