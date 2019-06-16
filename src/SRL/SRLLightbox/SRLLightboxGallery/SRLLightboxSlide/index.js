import React from "react";
import PropTypes from "prop-types";
import {
  SRLLightboxSlide,
  SRLLightboxContent,
  SRLLightboxImage
} from "../styles";

function SRLLightboxSlideComponent({ source, alt, thumbnailGallery }) {
  return (
    <SRLLightboxSlide>
      <SRLLightboxContent thumbnailGallery={thumbnailGallery}>
        <SRLLightboxImage src={source} alt={alt} />
      </SRLLightboxContent>
    </SRLLightboxSlide>
  );
}

SRLLightboxSlideComponent.propTypes = {
  source: PropTypes.string,
  alt: PropTypes.string,
  thumbnailGallery: PropTypes.bool
};

export default SRLLightboxSlideComponent;
