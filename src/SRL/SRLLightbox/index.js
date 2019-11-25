import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../SRLPortal";
import PropTypes from "prop-types";
import SRLLightboxGallery from "./SRLLightboxGallery";
import { SRLCtx } from "../SRLContext";
import styled from "@emotion/styled";

const PortalWithTransitionStyles = styled(Portal)`
  &.portal-transition-enter {
    opacity: 0;
  }
  &.portal-transition-enter-active {
    opacity: 1;
    transition: opacity ${props => props.transitionSpeed}ms ${props => props.transitionTimingFunction};
  }
  &.portal-transition-exit {
    opacity: 1;
  }
  &.portal-transition-exit-active {
    opacity: 0;
    transition: opacity ${props => props.transitionSpeed}ms ${props => props.transitionTimingFunction};
  }
`;

function SRLLightbox() {
  const context = useContext(SRLCtx);
  const {options, isOpened} = context;

  return (
    <CSSTransition
      in={isOpened}
      className="portal-transition"
      classNames="portal-transition"
      timeout={options.transitionSpeed}
    >
      <PortalWithTransitionStyles
        selector="SRLLightbox"
        isOpened={isOpened}
        transitionSpeed={options.transitionSpeed}
        transitionTimingFunction={options.transitionTimingFunction}
      >
        <SRLLightboxGallery {...context} />
      </PortalWithTransitionStyles>
    </CSSTransition>
  );
}

SRLLightbox.propTypes = {
  context: PropTypes.object
};

export default SRLLightbox;
