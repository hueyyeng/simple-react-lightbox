import React from "react";
import Portal from "../SRLPortal";
import { withContext } from "../SRLHoc";
import PropTypes from "prop-types";
import SRLLightboxGallery from "../SRLLightboxGallery";

function SRLLightbox({ context }) {
  return (
    <Portal selector="lightbox" isOpened={context.isOpened}>
      <SRLLightboxGallery {...context} />
    </Portal>
  );
}

SRLLightbox.propTypes = {
  context: PropTypes.object
};

export default withContext(SRLLightbox);
