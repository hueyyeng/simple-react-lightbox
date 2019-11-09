import React, { useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
  isOpened: false,
  elements: [],
  selectedElement: {
    source: "",
    caption: "",
    id: "",
    width: "",
    height: ""
  },
  options: {
    overlayColor: "rgba(0, 0, 0, 0.9)",
    transitionSpeed: 500,
    autoplaySpeed: 3000,
    slideTransitionSpeed: 600,
    showCaption: true,
    showThumbnails: true,
    captionColor: "#FFFFFF",
    captionFontFamily: "inherit",
    captionFontSize: "inherit",
    captionFontWeight: "inherit",
    captionFontStyle: "inherit",
    buttonsBackgroundColor: "rgba(30,30,36,0.8)",
    buttonsIconColor: "rgba(255, 255, 255, 0.8)"
  }
};

const SRLCtx = React.createContext(initialState);

const SRLContextComponent = props => {

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case "handleLightbox":
  //       return {
  //         ...state,
  //         isOpened: true,
  //         selectedImage: {
  //           source: action.payload.img,
  //           caption: action.payload.alt,
  //           id: action.payload.id,
  //           width: action.payload.width,
  //           height: action.payload.height
  //         }
  //       };
  //     case "grabImages":
  //       return {
  //         ...state,
  //         images: action.images // IE 11 -_-
  //       };
  //     case "handleCloseLightbox":
  //       return {
  //         ...state,
  //         isOpened: false
  //       };
  //     default:
  //       return state;
  //   }
  // }


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
