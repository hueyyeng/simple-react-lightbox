import React, { useReducer } from "react";
import PropTypes from "prop-types";
let isEqual = require("lodash/isEqual");
export const SRLCtxt = React.createContext();

const SRLContext = props => {
  const initialState = {
    isOpened: false,
    images: [],
    selectedImage: {
      source: "",
      description: "",
      id: ""
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
            description: action.payload.alt,
            id: action.payload.id
          }
        };
      case "grabImages":
        return {
          ...state,
          images: Array.prototype.slice.call(action.images) // IE 11 -_-
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

  const handleLightbox = (img, alt, id) => {
    const payload = { img, alt, id };
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
    <SRLCtxt.Provider
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
    </SRLCtxt.Provider>
  );
};

export default SRLContext;

SRLContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
