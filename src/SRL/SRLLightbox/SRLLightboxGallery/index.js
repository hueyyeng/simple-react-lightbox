import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SRLLightboxGalleryStage } from "./styles";
import SRLLightboxSlideComponent from "./SRLLightboxSlide";

const SRLLightboxGallery = ({
  isOpened,
  overlayColor,
  images,
  selectedImage,
  thumbnailGallery
}) => {
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const [galleryImages, setgalleryImages] = useState(images);

  useEffect(() => {
    // Add a class to the body to remove the overflow and compensate for the scroll-bar margin
    if (isOpened) {
      document.body.classList.add("SRLOpened");
    }
    // Clean up function to remove the class from the body
    return function cleanUp() {
      document.body.classList.remove("SRLOpened");
    };
  }, [currentImage, isOpened]);

  return (
    <SRLLightboxGalleryStage overlayColor={overlayColor}>
      {/* TODO: CREATE A COMPONENT FOR THE NAVIGATION */}

      {/* TODO: CREATE A COMPONENT FOR THE CHOOSEN IMAGE */}
      <SRLLightboxSlideComponent thumbnailGallery {...currentImage} />

      {/* TODO: CREATE A COMPONENT FOR THE GALLERY IF SELECTED */}
    </SRLLightboxGalleryStage>
  );
};

SRLLightboxGallery.propTypes = {
  isOpened: PropTypes.bool,
  images: PropTypes.array,
  overlayColor: PropTypes.string,
  thumbnailGallery: PropTypes.bool,
  selectedImage: PropTypes.object
};

export default SRLLightboxGallery;
