import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import Portal from '../SRLPortal'
import PropTypes from 'prop-types'
import SRLLightboxGallery from './SRLLightboxGallery'
import { SRLCtx } from '../SRLContext'
import styled from '@emotion/styled'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const PortalWrapper = styled(Portal)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

function SRLLightbox() {
  const context = useContext(SRLCtx)
  const { options, isOpened } = context

  return (
    <PortalWrapper selector="SRLLightbox" isOpened={isOpened}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{
          duration: options.settings.lightboxTransitionSpeed,
          ease: options.settings.lightboxTransitionTimingFunction
        }}
      >
        <SRLLightboxGallery {...context} />
      </motion.div>
    </PortalWrapper>
  )
}

SRLLightbox.propTypes = {
  context: PropTypes.object
}

export default SRLLightbox
