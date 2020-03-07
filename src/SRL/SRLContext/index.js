import React, { useReducer } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  elements: [],
  isOpened: false,
  options: {
    autoplaySpeed: 3000,
    buttonsIconPadding: '0px',
    buttonsBackgroundColor: 'rgba(30,30,36,0.8)',
    buttonsIconColor: 'rgba(255, 255, 255, 0.8)',
    buttonsSize: '40px',
    captionColor: '#FFFFFF',
    captionFontFamily: 'inherit',
    captionFontSize: 'inherit',
    captionFontStyle: 'inherit',
    captionFontWeight: 'inherit',
    enablePanzoom: true,
    hideControlsAfter: 3000,
    overlayColor: 'rgba(0, 0, 0, 0.9)',
    showCaption: true,
    showThumbnails: true,
    slideTransitionSpeed: 600,
    thumbnailsOpacity: 0.4,
    transitionSpeed: 600,
    transitionTimingFunction: 'ease'
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

const SRLContextComponent = props => {
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
