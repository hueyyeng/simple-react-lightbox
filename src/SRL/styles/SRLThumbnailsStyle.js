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

  &.SRLThumbnailSelected {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 60px;
    width: 80px;
  }
`
