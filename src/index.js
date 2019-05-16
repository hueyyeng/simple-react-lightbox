import React from "react";
import PropTypes from "prop-types";
import SRLContext, { Consumer } from "./SRL/SRLContext";
import { withContext } from "./SRL/SRLHoc";

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

export { Consumer as SRLConsumer };
export { withContext };

export default SimpleReactLightbox;
