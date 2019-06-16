import React, { useContext } from "react";
import Portal from "../SRLPortal";
import PropTypes from "prop-types";
import SRLLightboxGallery from "./SRLLightboxGallery";
import { SRLCtxt } from "../SRLContext";

function SRLLightbox() {
  const context = useContext(SRLCtxt);
  return (
    <Portal selector="lightbox" isOpened={context.isOpened}>
      <SRLLightboxGallery {...context} />
    </Portal>
  );
}

SRLLightbox.propTypes = {
  context: PropTypes.object
};

export default SRLLightbox;
