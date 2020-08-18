/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/index.scss'
import React from 'react'
import SimpleReactLightbox from 'simple-react-lightbox'

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => (
  <SimpleReactLightbox>{element}</SimpleReactLightbox>
)
