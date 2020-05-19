import React, { useContext, useEffect } from 'react'
import Portal from '../SRLPortal'
import PropTypes from 'prop-types'
import SRLLightboxGallery from './SRLLightboxGallery'
import { SRLCtx } from '../SRLContext'

function SRLLightbox() {
  const context = useContext(SRLCtx)
  const { isOpened } = context

  useEffect(() => {
    /* Set a value in the --vh custom property to the root of the document so that we can calculate the height of the light-box
    This is needed for mobile issues wit the VH unit
    https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */

    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <Portal selector="SRLLightbox" isOpened={isOpened}>
      <SRLLightboxGallery {...context} />
    </Portal>
  )
}

SRLLightbox.propTypes = {
  context: PropTypes.object
}

export default SRLLightbox
