import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import Portal from '../SRLPortal'
import PropTypes from 'prop-types'
import SRLLightboxGallery from './SRLLightboxGallery'
import { SRLCtx } from '../SRLContext'
import styled from '@emotion/styled'

const PortalWithTransitionStyles = styled(Portal)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &.portal-transition-enter {
    opacity: 0;
  }
  &.portal-transition-enter-active {
    opacity: 1;
    transition: opacity ${(props) => props.lightboxTransitionSpeed}ms
      ${(props) => props.lightboxTransitionTimingFunction};
  }
  &.portal-transition-exit {
    opacity: 1;
  }
  &.portal-transition-exit-active {
    opacity: 0;
    transition: opacity ${(props) => props.lightboxTransitionSpeed}ms
      ${(props) => props.lightboxTransitionTimingFunction};
  }
`

function SRLLightbox() {
  const context = useContext(SRLCtx)
  const { options, isOpened } = context

  return (
    <CSSTransition
      in={isOpened}
      classNames="portal-transition"
      timeout={options.settings.lightboxTransitionSpeed}
    >
      <PortalWithTransitionStyles
        selector="SRLLightbox"
        isOpened={isOpened}
        lightboxTransitionSpeed={options.settings.lightboxTransitionSpeed}
        lightboxTransitionTimingFunction={
          options.settings.lightboxTransitionTimingFunction
        }
      >
        <SRLLightboxGallery {...context} />
      </PortalWithTransitionStyles>
    </CSSTransition>
  )
}

SRLLightbox.propTypes = {
  context: PropTypes.object
}

export default SRLLightbox
