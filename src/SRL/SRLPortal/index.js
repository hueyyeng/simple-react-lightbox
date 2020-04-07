import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Portal = ({ isOpened, children, className }) => {
  // ClassName comes from the Styled Component
  const modalMarkup = (
    <div id="SRLLightbox" className={className}>
      {children}
    </div>
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
