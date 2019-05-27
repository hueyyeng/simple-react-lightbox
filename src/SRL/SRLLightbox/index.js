import React from "react";
import Portal from "../SRLPortal";
import { withContext } from "../SRLHoc";
import PropTypes from "prop-types";

function SRLLightbox(props) {
  const { context } = props;
  return (
    <Portal selector="lightbox" isOpened={context.isOpened}>
      <h1>Test</h1>
    </Portal>
  );
}

SRLLightbox.propTypes = {
  context: PropTypes.object
};

export default withContext(SRLLightbox);
