import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { ISRLContainer } from '../../types'

const thumbnailsOnRight = css`
  -ms-grid-columns: 1fr auto;
  grid-template-columns: 1fr auto;
  -ms-grid-rows: 90% auto;
  grid-template-rows: 90% auto;

  > *:nth-of-type(1) {
    grid-row: 1;
    -ms-grid-row: 1;
  }

  > *:nth-of-type(2) {
    grid-row: 2;
    -ms-grid-row: 2;
  }

  > *:nth-of-type(3) {
    grid-row: 3;
    -ms-grid-row: 1;
  }
`

const thumbnailsOnLeft = css`
  -ms-grid-columns: auto 1fr;
  grid-template-columns: auto 1fr;
  -ms-grid-rows: 90% auto;
  grid-template-rows: 90% auto;

  > *:nth-of-type(1) {
    grid-row: 1;
    -ms-grid-row: 1;
  }

  > *:nth-of-type(2) {
    grid-row: 2;
    -ms-grid-row: 2;
  }

  > *:nth-of-type(3) {
    grid-row: 3;
    -ms-grid-row: 1;
  }
`

// The content of the light-box
export const SRLContainer = styled.div<ISRLContainer>`
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
    grid-row: 1;
    -ms-grid-row: 1;
  }

  > *:nth-of-type(2) {
    grid-row: 2;
    -ms-grid-row: 2;
  }

  > *:nth-of-type(3) {
    grid-row: 3;
    -ms-grid-row: 3;
  }

  /* Thumbnails aligned to the right */
  ${(props) => props.thumbnailsPosition === 'right' && thumbnailsOnRight};

  /* Thumbnails aligned to the left */
  ${(props) => props.thumbnailsPosition === 'left' && thumbnailsOnLeft};

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
