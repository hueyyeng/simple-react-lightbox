import PropTypes from 'prop-types'

import { ISRLCaptionContainerComponent } from '../../../../../types'
import { SRLCaption } from '../../../../styles/SRLCaptionStyles'

const SRLCaptionContainerComponent = ({
  id,
  captionAlignment,
  captionOptions,
  caption,
  thumbnailsPosition,
  SRLCaptionRef
}: ISRLCaptionContainerComponent) => {
  return (
    <SRLCaption
      id={id}
      captionAlignment={captionAlignment}
      captionStyle={captionOptions}
      thumbnailsPosition={thumbnailsPosition}
      className="SRLCaptionContainer"
      ref={SRLCaptionRef}
    >
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
  SRLCaptionRef: PropTypes.object,
  thumbnailsPosition: PropTypes.string,
  caption: PropTypes.string
}

export default SRLCaptionContainerComponent
