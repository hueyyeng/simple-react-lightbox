import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { SRLCtx } from '../SRLContext'
import { SRLLightbox } from '../styles/SRLLightBoxstyles'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

interface IPortal {
  isOpened: boolean
  children: React.ReactNode
  className?: string
}

const Portal = ({ isOpened, children, className }: IPortal) => {
  const context = useContext(SRLCtx)
  const { options } = context

  // ClassName comes from the Styled Component
  const modalMarkup = (
    <SRLLightbox
      id="SRLLightbox"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      overlayColor={options.settings.overlayColor}
      transition={{
        duration: options.settings.lightboxTransitionSpeed,
        ease: options.settings.lightboxTransitionTimingFunction
      }}
      className={className}
    >
      {children}
    </SRLLightbox>
  )
  if (!isOpened || typeof window === 'undefined') {
    return null
  }

  return ReactDOM.createPortal(modalMarkup, document.body)
}

export default Portal

Portal.propTypes = {
  selector: PropTypes.string,
  isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
