import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../SRLPortal";
import PropTypes from "prop-types";
import SRLLightboxGallery from "./SRLLightboxGallery";
import { SRLCtxt } from "../SRLContext";
import styled from "styled-components";
import { Transition, config } from "react-spring/renderprops";
// const duration = 300;

// const PortalWithTransitionStyles = styled(Portal)`
//   &.portal-transition-enter {
//     opacity: 0;
//   }
//   &.portal-transition-enter-active {
//     opacity: 1;
//     transition: opacity ${duration}ms ease-in-out;
//   }
//   &.portal-transition-exit {
//     opacity: 1;
//   }
//   &.portal-transition-exit-active {
//     opacity: 0;
//     transition: opacity ${duration}ms ease-in-out;
//   }
// `;

function SRLLightbox() {
  const context = useContext(SRLCtxt);

  return (
    // <CSSTransition
    //   in={context.isOpened}
    //   className="portal-transition"
    //   classNames="portal-transition"
    //   timeout={duration}>

    <Portal selector="SRLLightbox" isOpened={context.isOpened}>
      <SRLLightboxGallery {...context} />
    </Portal>

    // </CSSTransition>
  );
}

SRLLightbox.propTypes = {
  context: PropTypes.object
};

export default SRLLightbox;
