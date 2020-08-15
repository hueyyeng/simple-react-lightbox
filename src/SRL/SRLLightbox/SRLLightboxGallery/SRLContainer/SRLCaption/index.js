import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SRLCaption } from '../../../../styles/SRLCaptionStyles'
import { SRLCtx } from '../../../../SRLContext'
const SRLCaptionContainerComponent = ({
  captionOptions,
  caption,
  thumbnailsPosition,
  SRLCaptionRef
}) => {
  const ctx = useContext(SRLCtx)
  const { selectedElement, customCaptions } = ctx

  function findCustomCaption(caption) {
    return caption.id === parseInt(selectedElement.id)
  }

  const customCaption = customCaptions.find(findCustomCaption)

  return (
    <SRLCaption
      captionStyle={captionOptions}
      thumbnailsPosition={thumbnailsPosition}
      className="SRLCaptionContainer"
      ref={SRLCaptionRef}
    >
      {customCaption ? (
        <div className="SRLCustomCaption">{customCaption.caption}</div>
      ) : (
        <p className="SRLCaptionText">{caption}</p>
      )}
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
  SRLCaptionRef: PropTypes.object,
  thumbnailsPosition: PropTypes.string,
  caption: PropTypes.string
}

export default SRLCaptionContainerComponent
