import styled from '@emotion/styled'

export const SRLProgressBarWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.barHeight};
  background-color: ${(props) => props.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`

export const SRLProgressBar = styled.div`
  height: ${(props) => props.barHeight};
  width: 100%;
  background-color: ${(props) => props.fillColor};
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0;
`
