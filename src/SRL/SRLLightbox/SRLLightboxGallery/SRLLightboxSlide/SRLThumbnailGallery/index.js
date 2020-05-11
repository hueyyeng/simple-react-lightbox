import React from 'react'
import PropTypes from 'prop-types'
import { SRLThumbnailGallery, SRLThumbnailGalleryImage } from '../../styles'

const SRLThumbnailGalleryComponent = ({
  elements,
  currentId,
  handleCurrentElement,
  thumbnailsOpacity,
  thumbnailsSize
}) => {
  return (
    <SRLThumbnailGallery className="SRLThumbnailsContainer">
      {elements.map((element, index) => {
        return (
          <SRLThumbnailGalleryImage
            onClick={() => handleCurrentElement(element.id, currentId)}
            thumbnailsOpacity={thumbnailsOpacity}
            thumbnailsSize={thumbnailsSize}
            key={index}
            className={`SRLThumb SRLThumb${index} ${
              currentId === element.id ? 'SRLSelected' : ''
            }`}
            style={{
              backgroundImage: `url('${element.thumbnail}')`
            }}
          />
        )
      })}
    </SRLThumbnailGallery>
  )
}

export default SRLThumbnailGalleryComponent

SRLThumbnailGalleryComponent.propTypes = {
  elements: PropTypes.array,
  handleCurrentElement: PropTypes.func,
  currentId: PropTypes.string,
  thumbnailsOpacity: PropTypes.number,
  thumbnailsSize: PropTypes.array
}
