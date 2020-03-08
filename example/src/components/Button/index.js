import React from 'react'
import { useLightbox } from 'simple-react-lightbox'

/*
We can use the provided hook in case you want
to open the lightbox from a button or anything :)
*/

const Button = props => {
  const openLightbox = useLightbox()

  return (
    <button
      className={`SRL_CTA-OpenLightbox ${props.light && 'light'}`}
      onClick={() => openLightbox(props.imageToOpen)}
    >
      Open the lightbox
    </button>
  )
}

export default Button
