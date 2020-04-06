import React from 'react'
import PropTypes from 'prop-types'
import SRLContextComponent from './SRL/SRLContext'
import SRLWrapper from './SRL/SRLWrapper'
import SRLLightbox from './SRL/SRLLightbox'
import { useLightbox } from './SRL/SRLHooks'

const SimpleReactLightbox = ({ children }) => {
  return (
    <SRLContextComponent>
      {children}
      <SRLLightbox />
    </SRLContextComponent>
  )
}

SimpleReactLightbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export { useLightbox, SRLWrapper }
export default SimpleReactLightbox
