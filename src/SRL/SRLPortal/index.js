import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Portal = ({ selector, isOpened, children }) => {
  const lightboxDiv = document.createElement("div");
  const rootDiv = document.getElementById("root");
  if (selector === undefined || isOpened === false) {
    const portal = document.getElementById(selector);
    if (portal !== null) {
      document.body.removeChild(portal);
    }
    return null;
  } else {
    lightboxDiv.setAttribute("id", selector);
    rootDiv.parentNode.insertBefore(lightboxDiv, rootDiv.nextSibling);
    return ReactDOM.createPortal(children, lightboxDiv);
  }
};

Portal.propTypes = {
  selector: PropTypes.string
};

export default Portal;
