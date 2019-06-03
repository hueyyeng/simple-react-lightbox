import { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Portal extends Component {
  componentDidMount() {
    let { selector } = this.props;
    const lightboxDiv = document.createElement("div");
    const rootDiv = document.getElementById("root");
    lightboxDiv.setAttribute("id", selector);
    this.element = lightboxDiv;
    rootDiv.parentNode.insertBefore(lightboxDiv, rootDiv.nextSibling);
  }

  render() {
    let { isOpened } = this.props;
    if (this.element === undefined || isOpened === false) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

Portal.propTypes = {
  selector: PropTypes.string,
  isOpened: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Portal;
