import styled from '@emotion/styled'

// Main div containing the light-box
const SRLLightboxGalleryStage = styled.div`
  background-color: ${(props) => props.overlayColor};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9991;
`

// The content of the light-box
const SRLLightboxContent = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

// The container for the image
const SRLLightboxElementContainer = styled.div`
  width: ${(props) => {
    if (props.showThumbnails === false && !!props.showCaption === false) {
      return '90vw'
    } else if (props.showThumbnails === false && props.showCaption === true) {
      return '85vw'
    } else if (props.showThumbnails === true && props.showCaption === false) {
      return '75vw'
    } else {
      return '70vw'
    }
  }};
  height: ${(props) => {
    if (props.showThumbnails === false && !!props.showCaption === false) {
      return '90vh'
    } else if (props.showThumbnails === false && props.showCaption === true) {
      return '85vh'
    } else if (props.showThumbnails === true && props.showCaption === false) {
      return '75vh'
    } else {
      return '70vh'
    }
  }};
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${(props) => {
    if (props.showThumbnails === false && !!props.showCaption === false) {
      return '0px'
    } else if (props.showThumbnails === false && props.showCaption === true) {
      return 'auto'
    } else if (props.showThumbnails === true && props.showCaption === false) {
      return 'auto'
    } else {
      return 'auto'
    }
  }};
  position: relative;
  @media (max-width: 768px) {
    width: 100vw;
    height: ${(props) => (props.showThumbnails ? '70vh' : '80vh')};
  }
  > div,
  .SRLTransitionGroup {
    width: 100%;
    height: 100%;
    outline: none;
  }
`

// Element Wrapper
const SRLElementWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  border: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &.element-transition-enter {
    opacity: 0;
  }
  &.element-transition-enter-active {
    opacity: 1;
    transition-timing-function: ${(props) =>
      props.slideTransitionTimingFunction
        ? props.slideTransitionTimingFunction
        : 'ease'};
    transition-duration: ${(props) =>
      props.slideTransitionSpeed ? props.slideTransitionSpeed + 'ms' : '600ms'};
    transition-property: opacity;
  }
  &.element-transition-exit {
    opacity: 1;
  }
  &.element-transition-exit-active {
    opacity: 0;
    transition-timing-function: ${(props) =>
      props.slideTransitionTimingFunction
        ? props.slideTransitionTimingFunction
        : 'ease'};
    transition-duration: ${(props) =>
      props.slideTransitionSpeed ? props.slideTransitionSpeed + 'ms' : '600ms'};
    transition-property: opacity;
  }
  &.element-transition-enter-done {
    opacity: 1;
    transition-timing-function: ${(props) =>
      props.slideTransitionTimingFunction
        ? props.slideTransitionTimingFunction
        : 'ease'};
    transition-duration: ${(props) =>
      props.slideTransitionSpeed ? props.slideTransitionSpeed + 'ms' : '600ms'};
    transition-property: opacity;
  }
`

// The Image
const SRLLightboxImage = styled.img`
  background: transparent;
  border: 0;
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 200ms ease;
  opacity: 1;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.disablePanzoom ? 'auto' : 'zoom-in')};
`

const SRLLightboxPanzoomImage = styled(SRLLightboxImage)`
  top: 0;
  left: 0;
  position: relative;
  transform-origin: 50% 50% !important;
  cursor: grab;
`

// The Video
const SRLLightboxVideo = styled.video`
  background: transparent;
  border: 0;
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: opacity 500ms ease;
  opacity: 1;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

// The caption
const SRRLLightboxCaption = styled.div`
  color: white;
  font-family: inherit;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 0;
  }
  p {
    margin: 0;
    padding: 0;
    text-align: center;
    background-color: transparent;
    @media (max-width: 768px) {
      padding: 0 15px;
    }
    font-weight: ${(props) =>
      props.captionStyle.captionFontWeight
        ? props.captionStyle.captionFontWeight
        : 'inherit'};
    font-size: ${(props) =>
      props.captionStyle.captionFontSize
        ? props.captionStyle.captionFontSize
        : 'inherit'};
    font-family: ${(props) =>
      props.captionStyle.captionColor
        ? props.captionStyle.captionFontFamily
        : 'inherit'};
    color: ${(props) =>
      props.captionStyle.captionColor
        ? props.captionStyle.captionColor
        : 'white'};
    font-style: ${(props) =>
      props.captionStyle.captionFontStyle
        ? props.captionStyle.captionFontStyle
        : 'inherit'};
    text-transform: ${(props) =>
      props.captionStyle.captionTextTransform
        ? props.captionStyle.captionTextTransform
        : 'inherit'};
  }
`

// The buttons
const StyledButton = styled.button`
  position: absolute;
  height: ${(props) => (props.buttonsSize ? props.buttonsSize : '30px')};
  width: ${(props) => (props.buttonsSize ? props.buttonsSize : '30px')};
  transition: color 0.3s ease;
  background-color: ${(props) =>
    props.buttonsBackgroundColor
      ? props.buttonsBackgroundColor
      : 'rgba(30, 30, 36, 0.8)'};
  border: 0;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  visibility: inherit;
  z-index: 9992;
  opacity: 1;
  transition: opacity 0.3s ease;
  .SRLIdle & {
    opacity: 0;
  }
  @media (max-width: 768px) {
    height: ${(props) =>
      props.buttonsSize
        ? Math.round(parseInt(props.buttonsSize, 10) / 1.3) + 'px'
        : '30px'};
    width: ${(props) =>
      props.buttonsSize
        ? Math.round(parseInt(props.buttonsSize, 10) / 1.3) + 'px'
        : '30px'};
  }
  &:focus {
    outline: none;
  }
  div {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: ${(props) =>
      props.buttonsIconPadding ? props.buttonsIconPadding : '5px'};
    box-sizing: border-box;
    svg {
      display: block;
      height: 100%;
      width: auto;
      overflow: visible;
      position: relative;
      path {
        transition: fill 0.3s ease;
        fill: ${(props) =>
          props.buttonsIconColor
            ? props.buttonsIconColor
            : 'rgba(255, 255, 255, 0.8)'};
      }
    }
    &:hover {
      svg path {
        fill: ${(props) =>
          props.buttonsIconColor &&
          // REGEX TO THE RESCUE (converts the RGBA value to have the full opacity to have the nice "hover" effect)
          props.buttonsIconColor.replace(/[\d\.]+\)$/g, '1)')};
      }
    }
  }
`

// Top right buttons
const SRLLLightboxTopButtons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  top: calc(env(safe-area-inset-top) + 5px);
  right: calc(env(safe-area-inset-right) + 5px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

// The "close" button
const SRRLLightboxCloseIcon = styled(StyledButton)`
  position: relative;
`

// The "expand" button
const SRRLExpandIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;
`

// The "zoomOut" button
const SRLZoomOutIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;
`

// The "autoplay" button
const SRRLLightboxAutoplayIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;
  display: ${(props) => (props.autoplaySpeed === 0 ? 'none' : 'block')};
`

// The "download" button
const SRRLDownloadIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;
`

// The "next" button
const SRLLightboxNextIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  right: 5px;
  right: calc(env(safe-area-inset-right) + 5px);
  @media (max-width: 768px) {
    display: none;
  }
`

// The "prev" button
const SRLLightboxPrevIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  left: 5px;
  left: calc(env(safe-area-inset-left) + 5px);
  @media (max-width: 768px) {
    display: none;
  }
`

// The thumbnails galley
const SRLLightboxThubnailGallery = styled.div`
  display: flex;
  color: white;
  height: auto;
  width: 100%;
  justify-content: center;
  align-self: flex-end;
  flex-wrap: wrap;
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  opacity: 1;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }

  .SRLIdle & {
    opacity: 0;
  }
  @media (max-width: 768px) {
    justify-content: start;
  }
`

// The images on the thumbnail gallery
const SRLLightboxThubnailGalleryImage = styled.a`
  width: ${(props) =>
    props.thumbnailsSize ? props.thumbnailsSize[0] : '80px'};
  height: ${(props) =>
    props.thumbnailsSize ? props.thumbnailsSize[1] : '80px'};
  background-repeat: no-repeat;
  background-size: cover;
  margin: 1px;
  opacity: ${(props) =>
    props.thumbnailsOpacity ? props.thumbnailsOpacity : '0.4'};
  transition: opacity 0.3s ease;
  display: block;
  cursor: pointer;
  flex: 0 0 auto;
  &:first-of-type {
    margin: 0;
  }
  &:last-child {
    margin: 0;
  }
  &.SRLSelected {
    opacity: 1;
  }
`

// Export all of the above
export {
  SRLLightboxGalleryStage,
  SRLLightboxContent,
  SRLLightboxElementContainer,
  SRLElementWrapper,
  SRLLightboxImage,
  SRLLightboxPanzoomImage,
  SRLLightboxVideo,
  SRRLLightboxCaption,
  SRRLLightboxCloseIcon,
  SRLLightboxNextIcon,
  SRLLightboxPrevIcon,
  SRRLLightboxAutoplayIcon,
  SRRLDownloadIcon,
  SRRLExpandIcon,
  SRLZoomOutIcon,
  SRLLightboxThubnailGallery,
  SRLLightboxThubnailGalleryImage,
  SRLLLightboxTopButtons
}
