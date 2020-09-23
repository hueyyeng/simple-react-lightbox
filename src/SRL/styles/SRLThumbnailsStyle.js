import styled from '@emotion/styled'
import { css } from '@emotion/core'

const thumbnailsOnRight = (props) => css`
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
`

const thumbnailsOnLeft = (props) => css`
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
`

// The thumbnails galley
export const SRLThumbnailGallery = styled.div`
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
    `};

  ${(props) =>
    props.thumbnailsAlignment === 'end' &&
    css`
      justify-content: flex-end;
    `};

  ${(props) =>
    props.thumbnailsAlignment === 'space-between' &&
    css`
      justify-content: space-between;
    `};

  ${(props) =>
    props.thumbnailsAlignment === 'space-evenly' &&
    css`
      justify-content: space-evenly;
    `};

  /* Thumbnails aligned to the right */
  ${(props) => props.thumbnailsPosition === 'right' && thumbnailsOnRight};

  /* Thumbnails aligned to the left */
  ${(props) => props.thumbnailsPosition === 'left' && thumbnailsOnLeft};

  /* if the body has a class of SRLIdle */
  .SRLIdle & {
    opacity: 0;
  }

  /* if the thumbnails are draggable */
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
export const SRLThumbnailGalleryImage = styled.a`
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

  ${(props) =>
    props.isVideoThumbnail &&
    css`
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: url('data:image/png;base64,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');
        z-index: 99;
        opacity: ${props.thumbnailsOpacity};
      }
    `}

  &.SRLThumbnailSelected {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 60px;
    width: 80px;
  }
`
