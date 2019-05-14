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
    isOpened: false
  };

  handleLightbox = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    return (
      <Provider
        value={{
          isOpened: this.state.isOpened,
          handleLightbox: this.handleLightbox
        }}>
        {this.state.isOpened ? "TEST" : null}
        {this.props.children}
      </Provider>
    );
  }
}
