import styled from '@emotion/styled'
import { motion } from 'framer-motion'

import { ISRLLightBox } from '../../types'

// Main DIV containing the entire light-box
export const SRLLightbox = styled(motion.div)<ISRLLightBox>`
  background-color: ${(props) => props.overlayColor};
  position: fixed;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 0;
  z-index: 9999;
`
