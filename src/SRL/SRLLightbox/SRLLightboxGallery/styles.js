import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const SRLLightBox = styled(motion.div)`
  background-color: ${(props) => props.overlayColor};
  position: fixed;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 0;
`

// The actual fill of the bar is
const SRLProgressBarWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.barHeight};
  background-color: ${(props) => props.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`

const SRLProgressBar = styled.div`
  height: ${(props) => props.barHeight};
  width: 100%;
  background-color: ${(props) => props.fillColor};
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0;
  will-change: transform;
  transition-timing-function: linear;
`

// The content of the light-box
const SRLContent = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: grid;
  display: -ms-grid;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
  align-items: center;
  justify-content: center;
  justify-items: center;
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  > *:nth-of-type(1) {
    -ms-grid-row: 1;
  }

  > *:nth-of-type(2) {
    -ms-grid-row: 2;
  }

  > *:nth-of-type(3) {
    -ms-grid-row: 3;
  }

  /* Thumbnails aligned to the right */
  ${(props) =>
    props.thumbnailsPosition === 'right' &&
    css`
      -ms-grid-columns: 1fr auto;
      grid-template-columns: 1fr auto;
      -ms-grid-rows: 90% auto;
      grid-template-rows: 90% auto;

      > *:nth-of-type(1) {
        -ms-grid-row: 1;
      }

      > *:nth-of-type(2) {
        -ms-grid-row: 2;
      }

      > *:nth-of-type(3) {
        -ms-grid-row: 1;
      }
    `};

  /* Thumbnails aligned to the left */
  ${(props) =>
    props.thumbnailsPosition === 'left' &&
    css`
      -ms-grid-columns: auto 1fr;
      grid-template-columns: auto 1fr;
      -ms-grid-rows: 90% auto;
      grid-template-rows: 90% auto;

      > *:nth-of-type(1) {
        -ms-grid-row: 1;
      }

      > *:nth-of-type(2) {
        -ms-grid-row: 2;
      }

      > *:nth-of-type(3) {
        -ms-grid-row: 1;
      }
    `};

  ${(props) =>
    props.hideThumbnails &&
    css`
      -ms-grid-rows: 90% auto;
      grid-template-rows: 90% auto;
    `};

  ${(props) =>
    !props.showCaption &&
    css`
      -ms-grid-rows: auto;
      grid-template-rows: auto;
    `};

  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`

// The container for the image
const SRLElementContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  width: 100vw;

  height: ${(props) =>
    props
      ? `calc(100vh - ${
          props.captionRefSizes.height + props.thumbnailRefSizes.height
        }px)`
      : '100%'};

  /* Thumbnails aligned to the right.
  We need to exclude the height of the div this time */
  ${(props) =>
    props.thumbnailsPosition === 'right' &&
    css`
      grid-column: 1/2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
      width: 100%;
      height: calc(100vh - ${props.captionRefSizes.height}px);
    `};

  /* Thumbnails aligned to the left */
  ${(props) =>
    props.thumbnailsPosition === 'left' &&
    css`
      grid-column: 2/2;
      -ms-grid-column: 2;
      width: 100%;
      height: calc(100vh - ${props.captionRefSizes.height}px);
    `};

  ${(props) =>
    props.hideThumbnails &&
    props.thumbnailsPosition === 'bottom' &&
    css`
      height: calc(100vh - ${props.thumbnailRefSizes.height}px);
    `};

  @media (max-width: 768px) {
    grid-column: auto;
    width: 100vw;
    height: ${(props) =>
      props
        ? `calc((var(--vh, 1vh) * 100) - ${
            props.captionRefSizes.height + props.thumbnailRefSizes.height
          }px)`
        : '100%'};
  }
`

// Element Wrapper
const SRLElementWrapper = styled(motion.div)`
  width: 100%;
  height: 90%;
  position: absolute;
  /* IE 11 HACK **/
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    top: 5%;
    left: 0;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

// The Image
const SRLImage = styled.img`
  background: transparent;
  border: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 200ms ease;
  opacity: 1;
  margin: auto;
  z-index: 9997;
  cursor: ${(props) => (props.cursorType ? 'auto' : 'zoom-in')};
`

// The Panz-oom image
const SRLPanzoomedImage = styled(SRLImage)`
  top: 0;
  left: 0;
  position: relative;
  transform-origin: 50% 50% !important;
  cursor: grab;
  z-index: 9997;
`

// // The Video
// const SRLLightboxVideo = styled.video`
//   background: transparent;
//   border: 0;
//   display: block;
//   max-width: 100%;
//   max-height: 100%;
//   width: auto;
//   height: auto;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
//   transition: opacity 500ms ease;
//   opacity: 1;
//   margin: auto;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `

// The caption
const SRLCaption = styled.div`
  color: white;
  font-family: inherit;
  outline: none;
  border: 0;
  position: relative;
  z-index: 9996;
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100vw;
  }
  width: 100%;
  height: 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-content: ${(props) => props.captionAlignment};
  padding: ${(props) =>
    props.captionStyle.captionContainerPadding
      ? props.captionStyle.captionContainerPadding
      : '0'};

  ${(props) =>
    /* Thumbnails aligned to the right */
    props.thumbnailsPosition === 'right' &&
    css`
      grid-column: 1/2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
      align-items: start;
    `};

  /* Thumbnails aligned to the left */
  ${(props) =>
    props.thumbnailsPosition === 'left' &&
    css`
      grid-column: 2/2;
      -ms-grid-column: 2;
      align-items: start;
    `};

  @media (max-width: 768px) {
    grid-column: auto;
  }

  p {
    margin: 0;
    text-align: center;
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

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 0 15px;
    }
  }
`

// The thumbnails galley
const SRLThumbnailGallery = styled.div`
  display: flex;
  color: white;
  height: auto;
  width: 100vw;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  opacity: 1;
  transition: 0.3s ease;
  will-change: transform, opacity;
  position: relative;
  z-index: 9997;
  cursor: pointer;
  padding: ${(props) =>
    props.thumbnailsContainerPadding ? props.thumbnailsContainerPadding : '0'};
  background-color: ${(props) =>
    props.thumbnailsContainerBackgroundColor
      ? props.thumbnailsContainerBackgroundColor
      : 'transparent'};

  /* Thumbnails alignment */
  ${(props) =>
    props.thumbnailsAlignment === 'start' &&
    css`
      justify-content: flex-start;
    `}

  ${(props) =>
    props.thumbnailsAlignment === 'end' &&
    css`
      justify-content: flex-end;
    `}

  ${(props) =>
    props.thumbnailsAlignment === 'space-between' &&
    css`
      justify-content: space-between;
    `}

  ${(props) =>
    props.thumbnailsAlignment === 'space-evenly' &&
    css`
      justify-content: space-evenly;
    `}

  /* Thumbnails aligned to the right */
  ${(props) =>
    props.thumbnailsPosition === 'right' &&
    css`
      flex-direction: column;
      -ms-grid-column: 2;
      grid-column-start: 2;
      -ms-grid-row: 1;
      grid-row-start: 1;
      -ms-grid-row-span: 2;
      grid-row-end: 3;
      height: 100%;
      width: auto;

      /* SAFARI HACK */
      @media not all and (min-resolution: 0.001dpcm) {
        @media {
          height: 100vh;
        }
      }

      /* IE 11 HACK **/
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        height: 100vh;
      }
    `};

  /* Thumbnails aligned to the left */
  ${(props) =>
    props.thumbnailsPosition === 'left' &&
    css`
      flex-direction: column;
      -ms-grid-column: 1;
      grid-column-start: 1;
      -ms-grid-row: 1;
      grid-row-start: 1;
      -ms-grid-row-span: 2;
      grid-row-end: 3;
      height: 100%;
      width: auto;

      /* SAFARI HACK */
      @media not all and (min-resolution: 0.001dpcm) {
        @media {
          height: 100vh;
        }
      }

      /* IE 11 HACK **/
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        height: 100vh;
      }
    `};

  .SRLIdle & {
    opacity: 0;
  }

  &.SRLDraggable {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    justify-content: start;
    overflow: auto !important;
    flex-direction: row;
    width: 100vw !important;
    height: auto;
    grid-column: auto;
    grid-row: auto;
  }
`

// The images on the thumbnail gallery
const SRLThumbnailGalleryImage = styled.a`
  width: ${(props) =>
    props.thumbnailsSize ? props.thumbnailsSize[0] : '80px'};
  height: ${(props) =>
    props.thumbnailsSize ? props.thumbnailsSize[1] : '80px'};
  background-repeat: no-repeat;
  background-size: cover;
  margin: ${(props) => (props.thumbnailsGap ? props.thumbnailsGap : '1px')};
  opacity: ${(props) =>
    props.thumbnailsOpacity ? props.thumbnailsOpacity : '0.4'};
  transition: 0.3s ease;
  will-change: opacity;
  display: block;
  cursor: draggable;
  flex: 0 0 auto;

  &.SRLThumbnailSelected {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 60px;
    width: 80px;
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
  z-index: 9998;
  opacity: 1;
  transition: opacity 0.3s ease;

  .SRLIdle & {
    opacity: 0;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    height: ${(props) =>
      props.buttonsSize
        ? Math.round(parseInt(props.buttonsSize, 10) / 1) + 'px'
        : '30px'};
    width: ${(props) =>
      props.buttonsSize
        ? Math.round(parseInt(props.buttonsSize, 10) / 1) + 'px'
        : '30px'};
  }

  @media (max-width: 360px) {
    height: ${(props) =>
      props.buttonsSize
        ? Math.round(parseInt(props.buttonsSize, 10) / 1.2) + 'px'
        : '30px'};
    width: ${(props) =>
      props.buttonsSize
        ? Math.round(parseInt(props.buttonsSize, 10) / 1.2) + 'px'
        : '30px'};

    .SRLIdle & {
      opacity: 1;
    }
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
const SRLTopButtons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  top: calc(env(safe-area-inset-top) + 5px);
  right: calc(env(safe-area-inset-right) + 5px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transition: 0.3s ease;
  will-change: right;

  /* Offset the buttons if the progress bar is active and the autoplay is "playing" */
  ${(props) =>
    props.showProgressBar &&
    props.autoplay &&
    css`
      top: ${Math.round(parseInt(props.buttonsOffsetFromProgressBar, 10)) *
      2}px;
      top: calc(
        env(safe-area-inset-top) +
          ${Math.round(parseInt(props.buttonsOffsetFromProgressBar, 10)) * 2}px
      );
    `}

  /* Offset the buttons if the thumbnails are on the right */
  ${(props) =>
    props.thumbnailsPosition === 'right' &&
    css`
      right: ${props.thumbnailRefSizes.width + 5}px;
      right: calc(
        env(safe-area-inset-top) + ${props.thumbnailRefSizes.width + 5}px
      );
    `}

  @media (max-width: 768px) {
    right: calc(env(safe-area-inset-right) + 5px);
  }



`

// The "close" button
const SRLCloseIcon = styled(StyledButton)`
  position: relative;
`

// The "expand" button
const SRLExpandIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;

  @media (max-width: 768px) {
    display: none;
  }
`

// The "zoomOut" button
const SRLZoomOutIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;
`

// The "autoplay" button
const SRLAutoplayIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;
  display: ${(props) => (props.autoplaySpeed === 0 ? 'none' : 'block')};
`

// The "download" button
const SRLThumbnailsIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;

  ${(props) =>
    props.thumbnailsPosition === 'right' &&
    css`
      svg {
        transform: rotate(-90deg);
      }
    `}

  ${(props) =>
    props.thumbnailsPosition === 'left' &&
    css`
      svg {
        transform: rotate(90deg);
      }
    `}

  @media (max-width: 768px) {
    svg {
      transform: rotate(0) !important;
    }
  }
`

// The "download" button
const SRLDownloadIcon = styled(StyledButton)`
  position: relative;
  margin-right: 5px;
`

// The "next" button
const SRLNextIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  right: 5px;
  right: calc(env(safe-area-inset-right) + 5px);
  transition: 0.3s ease;
  will-change: right;

  ${(props) =>
    props.thumbnailsPosition === 'right' &&
    css`
      right: ${props.thumbnailRefSizes.width + 5}px;
      right: calc(
        env(safe-area-inset-right) + ${props.thumbnailRefSizes.width + 5}px
      );
    `}

  @media (max-width: 768px) {
    display: none;
  }
`

// The "prev" button
const SRLPrevIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  left: 5px;
  left: calc(env(safe-area-inset-left) + 5px);
  transition: 0.3s ease;
  will-change: left;

  ${(props) =>
    props.thumbnailsPosition === 'left' &&
    css`
      left: ${props.thumbnailRefSizes.width + 5}px;
      left: calc(
        env(safe-area-inset-right) + ${props.thumbnailRefSizes.width + 5}px
      );
    `}

  @media (max-width: 768px) {
    display: none;
  }
`

// Export all of the above
export {
  SRLLightBox,
  SRLProgressBarWrapper,
  SRLProgressBar,
  SRLContent,
  SRLElementContainer,
  SRLElementWrapper,
  SRLImage,
  SRLPanzoomedImage,
  SRLCaption,
  SRLCloseIcon,
  SRLNextIcon,
  SRLPrevIcon,
  SRLAutoplayIcon,
  SRLThumbnailsIcon,
  SRLDownloadIcon,
  SRLExpandIcon,
  SRLZoomOutIcon,
  SRLThumbnailGallery,
  SRLThumbnailGalleryImage,
  SRLTopButtons
}
