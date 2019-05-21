import React, { Component } from "react";
import PropTypes from "prop-types";

export const { Provider, Consumer } = React.createContext();

export default class SRLContext extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  };

  state = {
    isOpened: false,
    images: []
  };

  handleLightbox = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  grabImages = images => {
    this.setState({ images });
  };

  render() {
    console.log(this.state.images);
    return (
      <Provider
        value={{
          isOpened: this.state.isOpened,
          handleLightbox: this.handleLightbox,
          grabImages: this.grabImages,
          images: this.state.images
        }}>
        {this.props.children}
      </Provider>
    );
  }
}
