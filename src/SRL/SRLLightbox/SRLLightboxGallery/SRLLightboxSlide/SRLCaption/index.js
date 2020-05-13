import React from 'react'
import PropTypes from 'prop-types'
import { SRLCaption } from '../../styles'

const SRLCaptionContainerComponent = ({ captionOptions, caption }) => {
  return (
    <SRLCaption captionStyle={captionOptions} className="SRLCaption">
      <p className="SRLCaptionText">{caption}</p>
    </SRLCaption>
  )
}

SRLCaptionContainerComponent.propTypes = {
  captionOptions: PropTypes.shape({
    showCaption: PropTypes.bool,
    captionColor: PropTypes.string,
    captionFontFamily: PropTypes.string,
    captionFontSize: PropTypes.string,
    captionFontStyle: PropTypes.string,
    captionFontWeight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    captionTextTransform: PropTypes.string
  }),
  id: PropTypes.string,
  caption: PropTypes.string
}

export default SRLCaptionContainerComponent
