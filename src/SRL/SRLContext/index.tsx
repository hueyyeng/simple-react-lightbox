import React, { useReducer } from 'react'
import PropTypes from 'prop-types'

import { IElement, IReducerAction, IState } from '../../types'

import {
  CLOSE_LIGHTBOX,
  HANDLE_ELEMENT,
  OPEN_AT_INDEX,
  READY_LIGHTBOX,
  RESET_LIGHTBOX
} from './actions'

const initialState: IState = {
  dispatch: () => {},
  elements: [],
  isOpened: false,
  isLoaded: false,
  options: {
    buttons: {
      backgroundColor: 'rgba(30,30,36,0.8)',
      iconColor: 'rgba(255, 255, 255, 0.8)',
      iconPadding: '10px',
      showThumbnailsButton: true,
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
      boxShadow: 'none',
      removeScrollBar: true,
      disableKeyboardControls: false,
      disablePanzoom: false,
      disableWheelControls: false,
      downloadedFileName: 'SRL-image',
      hideControlsAfter: 3000,
      limitToBounds: false,
      lightboxTransitionSpeed: 0.3,
      lightboxTransitionTimingFunction: 'linear',
      overlayColor: 'rgba(30, 30, 30, 0.9)',
      slideAnimationType: 'fade',
      slideSpringValues: [300, 50],
      slideTransitionSpeed: 0.6,
      slideTransitionTimingFunction: 'linear',
      usingPreact: false
    },
    caption: {
      captionAlignment: 'start',
      captionColor: '#FFFFFF',
      captionFontFamily: 'inherit',
      captionFontSize: 'inherit',
      captionFontStyle: 'inherit',
      captionFontWeight: 'inherit',
      captionContainerPadding: '20px 0 30px 0',
      captionTextTransform: 'inherit',
      showCaption: true
    },
    icons: {}, // Originally PRO version... need to revisit in the future
    translations: {}, // Originally PRO version... need to revisit in the future
    thumbnails: {
      showThumbnails: true,
      thumbnailsAlignment: 'center',
      thumbnailsContainerPadding: '0',
      thumbnailsContainerBackgroundColor: 'transparent',
      thumbnailsGap: '0 1px',
      thumbnailsIconColor: '#ffffff',
      thumbnailsPosition: 'bottom',
      thumbnailsOpacity: 0.4,
      thumbnailsSize: ['100px', '80px']
    },
    progressBar: {
      backgroundColor: '#f2f2f2',
      fillColor: '#000000',
      height: 3, // px unit
      showProgressBar: true
    }
  },
  selectedElement: {
    caption: '',
    height: 0,
    id: '0',
    src: '',
    source: '',
    thumbnail: '',
    width: 0
  },
  callbacks: {
    onCountSlides: () => {},
    onSlideChange: () => {},
    onLightboxClosed: () => {},
    onLightboxOpened: () => {}
  }
}

const SRLCtx = React.createContext(initialState)

type TSRLContextComponent = {
  children: React.ReactNode
}

const SRLContextComponent: React.FC<TSRLContextComponent> = (props) => {
  // Reducer
  const reducer: React.Reducer<IState, IReducerAction> = (
    state,
    action
  ): IState => {
    const stateElements = state.elements as IElement[]
    const actionElements = action.elements as IElement[]
    const actionElement = action.element as IElement

    switch (action.type) {
      case READY_LIGHTBOX:
        return {
          ...state,
          ...action.mergedSettings,
          elements: actionElements,
          isLoaded: true
        }
      case RESET_LIGHTBOX: {
        return {
          ...initialState
        }
      }
      case HANDLE_ELEMENT:
        return {
          ...state,
          isOpened: true,
          selectedElement: {
            ...actionElement
          }
        }
      case OPEN_AT_INDEX:
        return {
          ...state,
          isOpened: true,
          selectedElement: {
            ...stateElements[action.index as number]
          }
        }
      case CLOSE_LIGHTBOX:
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
