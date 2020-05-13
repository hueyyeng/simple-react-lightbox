import React, { useReducer } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  elements: [],
  isOpened: false,
  options: {
    buttons: {
      backgroundColor: 'rgba(30,30,36,0.8)',
      iconColor: 'rgba(255, 255, 255, 0.8)',
      iconPadding: '5px',
      showAutoplayButton: true,
      showCloseButton: true,
      showDownloadButton: true,
      showFullscreenButton: true,
      showNextButton: true,
      showPrevButton: true,
      size: '40px'
    },
    settings: {
      slideAnimationType: 'fade',
      autoplaySpeed: 3000,
      disableKeyboardControls: false,
      disableWheelControls: false,
      disablePanzoom: false,
      hideControlsAfter: 3000,
      lightboxTransitionSpeed: 0.6,
      lightboxTransitionTimingFunction: 'easeIn',
      overlayColor: 'rgba(0, 0, 0, 0.9)',
      slideTransitionSpeed: 0.6,
      slideSpringValues: [70, 60],
      slideTransitionTimingFunction: 'easeIn'
    },
    caption: {
      showCaption: true,
      captionColor: '#FFFFFF',
      captionFontFamily: 'inherit',
      captionFontSize: 'inherit',
      captionFontStyle: 'inherit',
      captionFontWeight: 'inherit',
      captionTextTransform: 'inherit'
    },
    thumbnails: {
      showThumbnails: true,
      thumbnailsOpacity: 0.4,
      thumbnailsSize: ['100px', '80px']
    },
    progressBar: {
      showProgressBar: true,
      backgroundColor: '#f2f2f2',
      fillColor: 'rgb(30,30,36)',
      height: '6px'
    }
  },
  selectedElement: {
    caption: '',
    height: 0,
    id: '',
    source: '',
    thumbnail: '',
    width: ''
  },
  callbacks: {
    onCountSlides: () => {},
    onSlideChange: () => {},
    onLightboxClosed: () => {},
    onLightboxOpened: () => {}
  }
}

const SRLCtx = React.createContext(initialState)

const SRLContextComponent = (props) => {
  // Reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case 'GRAB_SETTINGS':
        return {
          ...state,
          ...action.mergedSettings
        }
      case 'GRAB_ELEMENTS':
        return {
          ...state,
          elements: action.elements
        }
      case 'HANDLE_ELEMENT':
        return {
          ...state,
          isOpened: true,
          selectedElement: {
            ...action.element
          }
        }
      case 'OPEN_AT_INDEX':
        return {
          ...state,
          isOpened: true,
          selectedElement: {
            ...state.elements[action.index]
          }
        }
      case 'CLOSE_LIGHTBOX':
        return {
          ...state,
          isOpened: false
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SRLCtx.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {props.children}
    </SRLCtx.Provider>
  )
}

export { SRLCtx }
export default SRLContextComponent

SRLContextComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
