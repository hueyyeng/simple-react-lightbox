import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const thumbnailsOnRight = (props) => css`
  grid-column: 1/2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
  width: 100%;
  height: calc(100vh - ${props.captionDivSizes.height}px);
`

const thumbnailsOnLeft = (props) => css`
  grid-column: 2/2;
  -ms-grid-column: 2;
  width: 100%;
  height: calc(100vh - ${props.captionDivSizes.height}px);
`

const videoRatio = (props) => css`
  position: relative;
  /* XX% of viewport width */
  width: ${props.wrapperWidth + 'vw' || '60vw'};
  /* Ratio = 9/16 * XX */
  height: ${props.wrapperWidth
    ? (9 / 16) * props.wrapperWidth + 'vw'
    : '33.75vw'};
  max-height: ${props.wrapperWidth ? props.wrapperWidth + 'vh' : '60vh'};
  /* 16/9 * XX */
  max-width: ${props.wrapperWidth
    ? (16 / 9) * props.wrapperWidth + 'vh'
    : '106vh'};
  margin: auto;

  @media (max-width: 768px) {
    width: 100vw;
    height: 56.25vw; /* height:width ratio = 9/16 = .5625  */
    background: pink;
    max-height: 100vh;
    max-width: 177.78vh; /* 16/9 = 1.778 */
    margin: auto;
  }
`

// The container for the image
export const SRLElementContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  width: 100vw;
  height: ${(props) =>
    props
      ? `calc(100vh - ${
          props.captionDivSizes.height + props.thumbnailsDivSizes.height
        }px)`
      : '100%'};

  /* Thumbnails aligned to the right.
  We need to exclude the height of the div containing the thumbnails this time */
  ${(props) => props.thumbnailsPosition === 'right' && thumbnailsOnRight};

  /* Thumbnails aligned to the left.
    We need to exclude the height of the div containing the thumbnails this time */
  ${(props) => props.thumbnailsPosition === 'left' && thumbnailsOnLeft};
  /* Thumbnails hidden */
  ${(props) =>
    props.hideThumbnails &&
    props.thumbnailsPosition === 'bottom' &&
    css`
      height: calc(100vh - ${props.thumbnailsDivSizes.height}px);
    `};

  @media (max-width: 768px) {
    grid-column: auto;
    width: 100vw;
    height: ${(props) =>
      props
        ? `calc((var(--vh, 1vh) * 100) - ${
            props.captionDivSizes.height + props.thumbnailsDivSizes.height
          }px)`
        : '100%'};
  }
`

// Element Wrapper (Wrapping the element)
export const SRLElementWrapper = styled(motion.div)`
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

  .SRLVimeoVideoLoading {
    color: inherit;
  }
`

// Image Element
export const SRLImage = styled.img`
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
  cursor: ${(props) => (props.disablePanzoom ? 'auto' : 'zoom-in')};
`

// Video Element
export const SRLEmbedVideoWrapper = styled.div`
  ${videoRatio}
  .SRLYouTubeWrapper {
    ${videoRatio}
  }

  iframe,
  video {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`

// The Pan-zoomed image
export const SRLPanzoomedImage = styled.img`
  top: 0;
  left: 0;
  position: relative;
  transform-origin: 50% 50% !important;
  cursor: grab;
  z-index: 9997;
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`
