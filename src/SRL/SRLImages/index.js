import React, { Component } from "react";
import PropTypes from "prop-types";
import { withContext } from "../SRLHoc";

class SRLImagesContext extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    context: PropTypes.object,
    grabImages: PropTypes.func
  };

  constructor() {
    super();
    this.imgContainer = React.createRef();
  }

  componentDidMount() {
    const content = this.imgContainer.current;
    const images = content.getElementsByTagName("img");
    const imagesArray = [...images];
    this.props.context.grabImages(imagesArray);
  }

  render() {
    const { context } = this.props;
    return (
      <div ref={this.imgContainer}>
        {context.isOpened ? "Heyyyy" : null}
        {this.props.children}
      </div>
    );
  }
}

// We wrap this using our HOC component so we have access to the context
export default withContext(SRLImagesContext);
