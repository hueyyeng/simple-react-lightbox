import React, { useContext } from 'react'
import Portal from '../SRLPortal'
import PropTypes from 'prop-types'
import SRLLightboxGallery from './SRLLightboxGallery'
import { SRLCtx } from '../SRLContext'

function SRLLightbox() {
  const context = useContext(SRLCtx)
  const { isOpened } = context
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
