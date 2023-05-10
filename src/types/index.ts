import React from 'react'

import {
  CLOSE_LIGHTBOX,
  HANDLE_ELEMENT,
  OPEN_AT_INDEX,
  READY_LIGHTBOX,
  RESET_LIGHTBOX
} from '../SRL/SRLContext/actions'
import { GALLERY_IMAGE, IMAGE } from '../SRL/SRLWrapper/element_types'

// For 'subscribe-event' package
export interface ISubscribe {
  element: HTMLElement | Node | object
  event: string
  eventCallback: () => void
  options?: any
}

export interface IOptionsSettings {
  autoplaySpeed: number
  boxShadow: string
  removeScrollBar: boolean
  disableKeyboardControls: boolean
  disablePanzoom: boolean
  disableWheelControls: boolean
  downloadedFileName: string
  hideControlsAfter: number
  limitToBounds: boolean
  lightboxTransitionSpeed: number
  lightboxTransitionTimingFunction: string
  overlayColor: string
  slideAnimationType: string
  slideSpringValues: number[]
  slideTransitionSpeed: number
  slideTransitionTimingFunction: string
  usingPreact: boolean
}

export interface IOptionsButtons {
  backgroundColor: string
  iconColor: string
  iconPadding: string
  showAutoplayButton: boolean
  showCloseButton: boolean
  showDownloadButton: boolean
  showFullscreenButton: boolean
  showNextButton: boolean
  showPrevButton: boolean
  showThumbnailsButton: boolean
  size: string
}

export interface IOptionsCaption {
  captionAlignment: string
  captionColor: string
  captionContainerPadding: string
  captionFontFamily: string
  captionFontSize: string
  captionFontStyle: string
  captionFontWeight: string
  captionTextTransform: string
  showCaption: boolean
}

export interface IOptionsThumbnails {
  showThumbnails: boolean
  thumbnailsAlignment: string
  thumbnailsContainerBackgroundColor: string
  thumbnailsContainerPadding: string
  thumbnailsGap: string
  thumbnailsIconColor: string
  thumbnailsOpacity: number
  thumbnailsPosition: string
  thumbnailsSize: [string, string]
}

export interface IOptionsProgressBar {
  backgroundColor: string
  fillColor: string
  height: number
  showProgressBar: boolean
}

export interface IOptions {
  settings: IOptionsSettings
  buttons: IOptionsButtons
  caption: IOptionsCaption
  thumbnails: IOptionsThumbnails
  progressBar: IOptionsProgressBar
  icons?: object
  translations?: object
}

export interface ICallbacks {
  onCountSlides: (newValue: object) => void
  onSlideChange: (newValue: object) => void
  onLightboxClosed: (newValue: object) => void
  onLightboxOpened: (newValue: object) => void
}

export interface IState {
  dispatch: React.Dispatch<IReducerAction>
  isOpened: boolean
  isLoaded: boolean
  options: IOptions
  elements: IElement[]
  selectedElement: IElement
  callbacks: ICallbacks
}

export type ActionType =
  | typeof READY_LIGHTBOX
  | typeof RESET_LIGHTBOX
  | typeof HANDLE_ELEMENT
  | typeof OPEN_AT_INDEX
  | typeof CLOSE_LIGHTBOX

export interface IReducerAction {
  index?: number
  element?: IElement
  elements?: Array<IElement>
  mergedSettings?: {
    options: IOptions
    callbacks: ICallbacks
  }
  type: ActionType
}

export interface IElement {
  id: string
  src: string
  source?: string
  caption?: string
  thumbnail?: string
  width?: number
  height?: number
  type?: 'gallery_image' | 'image' | 'video' | 'embed_video'
  showControls?: boolean
  videoAutoplay?: boolean
  muted?: boolean
}

export interface ISRLWrapper {
  options: IOptions
  callbacks: ICallbacks
  elements: Array<IElement>
  children: React.ReactNode
  defaultOptions: IOptions
  defaultCallbacks: ICallbacks
}

export interface ISRLLightboxGallery {
  options: IOptions
  callbacks: ICallbacks
  selectedElement: IElement
  elements: Array<IElement>
  dispatch: any
}

export interface IArrayImage {
  type: typeof GALLERY_IMAGE | typeof IMAGE
  element: HTMLImageElement
}

export interface ISettings {
  autoplaySpeed: number
  boxShadow: string | 'none'
  removeScrollBar: boolean
  disableKeyboardControls: boolean
  disablePanzoom: boolean
  disableWheelControls: boolean
  downloadedFileName: string
  hideControlsAfter: number
  limitToBounds: boolean
  lightboxTransitionSpeed: number
  lightboxTransitionTimingFunction: string
  overlayColor: string
  slideAnimationType: string
  slideSpringValues: number[]
  slideTransitionSpeed: number
  slideTransitionTimingFunction: string
  usingPreact: boolean
}

export interface IButtons {
  backgroundColor: string
  iconColor: string
  iconPadding: string
  showAutoplayButton: boolean
  showCloseButton: boolean
  showDownloadButton: boolean
  showFullscreenButton: boolean
  showNextButton: boolean
  showPrevButton: boolean
  showThumbnailsButton: boolean
  size: string
}

export interface ISRLLightboxControls {
  autoplay: boolean
  buttons: IButtons
  buttonsOffsetFromProgressBar: number
  currentElementID: string
  handleCloseLightbox: () => void
  handleFullScreen: () => void
  handleImageDownload: () => void
  handleNextElement: (id: string) => void
  handlePrevElement: (id: string) => void
  handlePanzoom: (zoom: boolean) => void
  handleThumbnails: () => void
  hideThumbnails: boolean
  panzoomEnabled: boolean
  setAutoplay: React.Dispatch<React.SetStateAction<boolean>>
  settings: ISettings
  showProgressBar: boolean
  showThumbnails: boolean
  SRLThumbnailsRef: React.RefObject<HTMLDivElement>
  thumbnailsPosition: string
  thumbnailsSize: [string, string]
}

export interface IProgressBar {
  backgroundColor: string
  fillColor: string
  height: number
  showProgressBar: boolean
}

export interface ISRLProgressBarComponent {
  autoplay: boolean
  autoplaySpeed: number
  progressBar: IProgressBar
  currentElementID: string
}

export interface ISRLCaption {
  captionAlignment: string
  captionStyle: {
    captionColor: string
    captionContainerPadding: string
    captionFontFamily: string
    captionFontSize: string
    captionFontStyle: string
    captionFontWeight: string
    captionTextTransform: string
  }
  thumbnailsPosition: string
}

export interface ISRLContainer {
  thumbnailsPosition: string
  hideThumbnails: boolean
  showCaption: boolean
}

export interface ISRLElementContainer {
  thumbnailsPosition: string
  hideThumbnails: boolean
  captionDivSizes: {
    height: number
    width: number
  }
  thumbnailsDivSizes: {
    height: number
    width: number
  }
}

export interface IThumbnailsOn {
  captionDivSizes: {
    height: number
    width: number
  }
}

export interface ISRLImage {
  boxShadow: string | 'none'
  disablePanzoom: boolean
}

export interface IImageLoad {
  src?: string
  caption?: string
  limitToBounds: boolean
  disablePanzoom: boolean
  handlePanzoom: (zoom: boolean) => void
  panzoomEnabled: boolean
  boxShadow: string | 'none'
  imgHeight?: number
  imgWidth?: number
}

export interface ISRLTopButtons {
  autoplay?: boolean
  autoplaySpeed?: number
  buttonsOffsetFromProgressBar?: number
  showProgressBar?: boolean
  hideThumbnails?: boolean
  thumbnailsPosition?: string
  thumbnailsDivSizes?: {
    height: number
    width: number
  }
}

export interface IIcon extends ISRLTopButtons {
  buttonsBackgroundColor?: string
}

export interface IStyledButton {
  buttonsSize: string
  buttonsBackgroundColor: string
  buttonsIconColor: string
  buttonsIconPadding: string
}

export interface ISRLLightBox {
  overlayColor: string
}

export interface ISRLContainerComponent {
  caption?: string
  direction?: string
  elements: IElement[]
  handleCurrentElement: (id: string, currentId: string) => void
  handleCloseLightbox: () => void
  handleNextElement: (id: string) => void
  handlePrevElement: (id: string) => void
  handlePanzoom: (zoom: boolean) => void
  height?: number
  width?: number
  hideThumbnails: boolean
  id: string
  options: IOptions
  panzoomEnabled: boolean
  source?: string
  SRLThumbnailsRef: React.MutableRefObject<HTMLDivElement | null>
  SRLCaptionRef: React.MutableRefObject<HTMLDivElement | null>
}

export interface ISRLCaptionContainerComponent {
  id: string
  captionAlignment: string
  captionOptions: {
    showCaption: boolean
    captionColor: string
    captionContainerPadding: string
    captionFontFamily: string
    captionFontSize: string
    captionFontStyle: string
    captionFontWeight: string
    captionTextTransform: string
  }
  SRLCaptionRef: React.MutableRefObject<HTMLDivElement | null>
  thumbnailsPosition: string
  caption?: string
}

export interface ISRLProgressBarWrapper {
  barHeight: number
  backgroundColor: string
}

export interface ISRLProgressBar {
  barHeight: number
  fillColor: string
}

export interface ISRLThumbnailGalleryComponent {
  elements: IElement[]
  currentId: string
  handleCurrentElement: (id: string, currentId: string) => void
  thumbnails: IOptionsThumbnails
  SRLThumbnailsRef: React.RefObject<HTMLDivElement>
}

export interface ISRLThumbnailGalleryImage {
  thumbnailsSize: [string, string]
  thumbnailsGap: string
  thumbnailsOpacity: number
}

export interface ISRLVideoIcon {
  thumbnailsIconColor: string
}

export interface ISRLVideoIconStyle {
  thumbnailsSize?: [string, string]
  thumbnailsOpacity?: number
}

export interface ISRLThumbnailGallery {
  thumbnailsSize: [string, string]
  thumbnailsContainerPadding: string
  thumbnailsContainerBackgroundColor: string
  thumbnailsAlignment: string
  thumbnailsPosition: string
}
