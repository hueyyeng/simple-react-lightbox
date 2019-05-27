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
    images: [],
    selectedImage: {
      source: "",
      description: "",
      id: ""
    }
  };

  handleLightbox = (img, alt, id) => {
    this.setState(prevState => ({
      ...prevState,
      isOpened: !this.state.isOpened,
      selectedImage: {
        source: img,
        description: alt,
        id
      }
    }));
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
          images: this.state.images,
          selectedImage: this.state.selectedImage
        }}>
        {this.props.children}
      </Provider>
    );
  }
}
