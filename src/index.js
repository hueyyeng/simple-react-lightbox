import React from "react";
import PropTypes from "prop-types";
import SRLContext from "./SRL/SRLContext";
import { withContext } from "./SRL/SRLHoc";
import SRLImagesContext from "./SRL/SRLImages";

const SimpleReactLightbox = ({
  overlayColour,
  overlayOpacity,
  thumbnailGallery,
  children
}) => {
  return (
    <SRLContext
      overlayColour={overlayColour || "#000000"}
      overlayOpacity={overlayOpacity || 0.8}
      thumbnailGallery={thumbnailGallery || false}>
      {children}
    </SRLContext>
  );
};

SimpleReactLightbox.propTypes = {
  overlayColour: PropTypes.string,
  overlayOpacity: PropTypes.number,
  thumbnailGallery: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { withContext };
export { SRLImagesContext as SRLImages };
export default SimpleReactLightbox;
