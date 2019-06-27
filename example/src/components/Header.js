import React from "react";
import { withSRLContext } from "simple-react-lightbox";

const Header = props => {
  return (
    <div>
      <h1>Header</h1>
      <span onClick={props.openLightbox}>Open lightbox</span>
      <span onClick={props.closeLightbox}>Close lightbox</span>
    </div>
  );
};

export default withSRLContext(Header);
