import React, { useContext, useEffect, useRef } from 'react'
import Portal from '../SRLPortal'
import PropTypes from 'prop-types'
import SRLLightboxGallery from './SRLLightboxGallery'
import { SRLCtx } from '../SRLContext'
import { AnimatePresence } from 'framer-motion'

function SRLLightbox() {
  const context = useContext(SRLCtx)
  const { isOpened } = context

  const vh = useRef()

  useEffect(() => {
    /* Set a value in the --vh custom property to the root of the document so that we can calculate the height of the light-box
    This is needed due to a mobile issues wit the VH unit https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */

    function getVH() {
      vh.current = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh.current}px`)
    }

    getVH()

    window.addEventListener('resize', getVH)
    return () => window.removeEventListener('resize', getVH)
  }, [])

  return (
    <AnimatePresence>
      {isOpened && (
        <Portal selector="SRLLightbox" isOpened={isOpened}>
          <SRLLightboxGallery {...context} />
        </Portal>
      )}
    </AnimatePresence>
  )
}

SRLLightbox.propTypes = {
  context: PropTypes.object
}

export default SRLLightbox
