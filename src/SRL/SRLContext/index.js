import React, { useReducer } from "react";
import PropTypes from "prop-types";
let isEqual = require("lodash/isEqual");
export const SRLCtx = React.createContext();

const SRLContextComponent = props => {
  const initialState = {
    isOpened: false,
    images: [],
    selectedImage: {
      source: "",
      caption: "",
      id: "",
      width: "",
      height: ""
    }
  };

  function reducer(state, action) {
    switch (action.type) {
      case "handleLightbox":
        return {
          ...state,
          isOpened: true,
          selectedImage: {
            source: action.payload.img,
            caption: action.payload.alt,
            id: action.payload.id,
            width: action.payload.width,
            height: action.payload.height
          }
        };
      case "grabImages":
        return {
          ...state,
          images: action.images // IE 11 -_-
        };
      case "handleCloseLightbox":
        return {
          ...state,
          isOpened: false
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLightbox = (img, alt, id, width, height) => {
    const payload = { img, alt, id, width, height };
    if (!state.isOpened) {
      if (!isEqual(state.selectedImage, payload)) {
        dispatch({ type: "handleLightbox", payload });
      }
    }
  };

  const grabImages = images => {
    // SUPER IMPORTANT TO AVOID A MEMORY LEAK
    if (!state.isOpened) {
      if (state.images.length < images.length) {
        dispatch({ type: "grabImages", images });
      }
    }
  };

  function handleCloseLightbox() {
    if (state.isOpened) {
      dispatch({ type: "handleCloseLightbox" });
    }
  }

  return (
    <SRLCtx.Provider
      value={{
        handleLightbox,
        grabImages,
        handleCloseLightbox,
        ...state,
        // We spread the props so that we can pass the configuration set by the user :)
        ...props
      }}
    >
      {props.children}
    </SRLCtx.Provider>
  );
};

export default SRLContextComponent;

SRLContextComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
