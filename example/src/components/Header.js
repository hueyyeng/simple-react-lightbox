import React from "react";
import { withContext } from "simple-react-lightbox";

const Header = props => {
  console.log(props);
  return (
    <div>
      <h1>Header</h1>
      <span onClick={props.context.handleLightbox}>Open lightbox</span>
    </div>
  );
};

export default withContext(Header);
