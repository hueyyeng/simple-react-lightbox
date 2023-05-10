import styled from '@emotion/styled'

import { ISRLProgressBar, ISRLProgressBarWrapper } from '../../types'

export const SRLProgressBarWrapper = styled.div<ISRLProgressBarWrapper>`
  width: 100%;
  height: ${(props) => `${props.barHeight}px`};
  background-color: ${(props) => props.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`

export const SRLProgressBar = styled.div<ISRLProgressBar>`
  height: ${(props) => `${props.barHeight}px`};
  width: 100%;
  background-color: ${(props) => props.fillColor};
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0;
`
