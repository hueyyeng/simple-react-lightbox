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
      autoplaySpeed: 3000,
      disableKeyboardControls: false,
      disablePanzoom: false,
      disableWheelControls: false,
      hideControlsAfter: 3000,
      lightboxTransitionSpeed: 0.3,
      lightboxTransitionTimingFunction: 'linear',
      overlayColor: 'rgba(0, 0, 0, 0.9)',
      slideAnimationType: 'fade',
      slideSpringValues: [300, 200],
      slideTransitionSpeed: 0.6,
      slideTransitionTimingFunction: 'linear'
    },
    caption: {
      captionAlignment: 'start',
      captionColor: '#FFFFFF',
      captionFontFamily: 'inherit',
      captionFontSize: 'inherit',
      captionFontStyle: 'inherit',
      captionFontWeight: 'inherit',
      captionContainerPadding: '0',
      captionTextTransform: 'inherit',
      showCaption: true
    },
    thumbnails: {
      showThumbnails: true,
      thumbnailsAlignment: 'center',
      thumbnailsContainerPadding: '0',
      thumbnailsContainerBackgroundColor: 'transparent',
      thumbnailsGap: '0 1px',
      thumbnailsPosition: 'bottom',
      thumbnailsOpacity: 0.4,
      thumbnailsSize: ['100px', '80px']
    },
    progressBar: {
      backgroundColor: '#f2f2f2',
      fillColor: '#000000',
      height: '3px',
      showProgressBar: true
    }
  },
  selectedElement: {
    caption: '',
    height: 0,
    id: 0,
    source: '',
    thumbnail: '',
    width: 0
  },
  callbacks: {
    onCountSlides: () => {},
    onSlideChange: () => {},
    onLightboxClosed: () => {},
    onLightboxOpened: () => {}
  },
  customCaptions: [{}]
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
