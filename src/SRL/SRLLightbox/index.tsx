import { useContext, useEffect, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

import { SRLCtx } from '../SRLContext'
import Portal from '../SRLPortal'

import SRLLightboxGallery from './SRLLightboxGallery'

let scrollY: number // Store scroll position here

function SRLLightbox() {
  const context = useContext(SRLCtx)
  const { isOpened, options } = context
  const isRemoveScrollBar = options.settings.removeScrollBar
  const isUsingPreact = options.settings.usingPreact
  const vhRef = useRef<number | undefined>()
  if (typeof window !== 'undefined') {
    const iOSSafari =
      navigator.userAgent.match(/safari/i) &&
      navigator.vendor.match(/apple/i) &&
      navigator.maxTouchPoints

    const isiPad =
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0) ||
      navigator.platform === 'iPad'

    if (iOSSafari && !isiPad) {
      const isSRLLightbox = document.getElementById('SRLLightbox')
      if (isSRLLightbox) {
        if (isOpened) {
          if (window.scrollY) {
            scrollY = window.scrollY
          }
          document.body.style.position = 'fixed'
        } else {
          document.body.style.position = 'inherit'
          window.scrollTo(0, scrollY)
        }
      }
    }
  }

  useEffect(() => {
    /* Set a value in the --vh custom property to the root of the document so that we can calculate the height of the light-box
    This is needed due to a mobile issues wit the VH unit https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
    function getVH() {
      if (typeof window !== 'undefined') {
        vhRef.current = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vhRef.current}px`)
      }
    }
    getVH()

    window.addEventListener('resize', getVH)
    return () => window.removeEventListener('resize', getVH)
  }, [])

  if (isUsingPreact) {
    return (
      <Portal selector="SRLLightbox" isOpened={isOpened}>
        <RemoveScroll removeScrollBar={isRemoveScrollBar}>
          <SRLLightboxGallery {...context} />
        </RemoveScroll>
      </Portal>
    )
  } else {
    return (
      <AnimatePresence>
        {isOpened && (
          <RemoveScroll removeScrollBar={isRemoveScrollBar}>
            <Portal selector="SRLLightbox" isOpened={isOpened}>
              <SRLLightboxGallery {...context} />
            </Portal>
          </RemoveScroll>
        )}
      </AnimatePresence>
    )
  }
}

SRLLightbox.propTypes = {
  context: PropTypes.object
}

export default SRLLightbox
