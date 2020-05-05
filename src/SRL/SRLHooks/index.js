import { useContext } from 'react'
import { SRLCtx } from '../SRLContext'

export function useLightbox() {
  const ctx = useContext(SRLCtx)

  const openLightbox = (slideIndex) => {
    ctx.dispatch({ type: 'OPEN_AT_INDEX', index: slideIndex })
  }

  const closeLightbox = () => {
    ctx.dispatch({ type: 'CLOSE_LIGHTBOX' })
  }

  return { openLightbox, closeLightbox }
}
