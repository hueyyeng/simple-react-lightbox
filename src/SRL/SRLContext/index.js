import React, { useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
  elements: [],
  isOpened: false,
  options: {
    autoplaySpeed: 3000,
    buttonIconPadding: "0px",
    buttonsBackgroundColor: "rgba(30,30,36,0.8)",
    buttonsIconColor: "rgba(255, 255, 255, 0.8)",
    buttonsSize: "40px",
    captionColor: "#FFFFFF",
    captionFontFamily: "inherit",
    captionFontSize: "inherit",
    captionFontStyle: "inherit",
    captionFontWeight: "inherit",
    overlayColor: "rgba(0, 0, 0, 0.9)",
    showCaption: true,
    showThumbnails: true,
    slideTransitionSpeed: 600,
    transitionTimingFunction: "ease",
    transitionSpeed: 600
  },
  selectedElement: {
    caption: undefined,
    height: undefined,
    id: undefined,
    source: undefined,
    width: undefined
  }
};

const SRLCtx = React.createContext(initialState);

const SRLContextComponent = props => {

  // Reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "GRAB_OPTIONS":
        return {
          ...state,
          options: {
            ...action.mergedOptions
          }
        }
      case "GRAB_ELEMENTS":
        return {
          ...state,
          elements: action.elements
        }
      case "HANDLE_ELEMENT":
        return {
          ...state,
          isOpened: true,
          selectedElement: {
            ...action.element
          }
        }
      case "CLOSE_LIGHTBOX":
        return {
          ...state,
          isOpened: false
        }
      case "OPEN_LIGHTBOX":
        return {
          ...state,
          isOpened: true
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SRLCtx.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {props.children}
    </SRLCtx.Provider>
  );
};

export {SRLCtx}
export default SRLContextComponent;

SRLContextComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
