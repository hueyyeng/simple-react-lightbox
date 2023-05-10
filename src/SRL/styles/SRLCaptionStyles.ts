import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { ISRLCaption } from '../../types'

// The caption
export const SRLCaption = styled.div<ISRLCaption>`
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
  min-height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: ${(props) => props.captionAlignment};
  padding: ${(props) =>
    props.captionStyle.captionContainerPadding
      ? props.captionStyle.captionContainerPadding
      : '20px 0 30px 0'};

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

  /* Paragraph inside the caption container */
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
