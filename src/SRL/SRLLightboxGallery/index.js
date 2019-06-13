import React, { useEffect } from "react";
import PropTypes from "prop-types";

const SRLLightboxGallery = ({ isOpened, images }) => {
  useEffect(() => {
    console.log("is", isOpened);
  });

  return <div>Hello</div>;
};

SRLLightboxGallery.propTypes = {
  isOpened: PropTypes.bool,
  images: PropTypes.array
};

export default SRLLightboxGallery;
