import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Portal = ({ isOpened, selector, children }) => {
  const modalMarkup = <div id={selector}>{children}</div>;
  if (!isOpened || selector === undefined) {
    return null;
  }
  return ReactDOM.createPortal(modalMarkup, document.body);
};

export default Portal;

Portal.propTypes = {
  selector: PropTypes.string,
  isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
