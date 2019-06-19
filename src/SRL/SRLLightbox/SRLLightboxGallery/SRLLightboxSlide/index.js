import React from "react";
import PropTypes from "prop-types";
import SRLLightboxThubnailGallery from "./SRLLightboxThubnailGallery";
import {
  SRLLightboxContent,
  SRRLLightboxCaption,
  SRLLightboxImageContainer,
  SRLLightboxImage
} from "../styles";

function SRLLightboxSlideComponent({
  source,
  description,
  thumbnailGallery,
  images
}) {
  return (
    // <SRLLightboxContent
    //   description={description}
    //   thumbnailGallery={thumbnailGallery}>
    //   <SRLLightboxImage className="SRLImage" src={source} alt={description} />
    //   <SRRLLightboxCaption className="SRLCaption">
    //     {description}
    //   </SRRLLightboxCaption>
    //   {thumbnailGallery && <SRLLightboxThubnailGallery images={images} />}
    // </SRLLightboxContent>

    <SRLLightboxContent className="SRLContent">
      <SRLLightboxImageContainer className="SRLImageContainer">
        <SRLLightboxImage className="SRLImage" src={source} alt={description} />
      </SRLLightboxImageContainer>
      <SRRLLightboxCaption className="caption">
        {description}
      </SRRLLightboxCaption>
    </SRLLightboxContent>
  );
}

SRLLightboxSlideComponent.propTypes = {
  source: PropTypes.string,
  description: PropTypes.string,
  thumbnailGallery: PropTypes.bool,
  images: PropTypes.array
};

export default SRLLightboxSlideComponent;
