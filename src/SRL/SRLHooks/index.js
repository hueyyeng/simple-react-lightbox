import { useContext } from 'react'
import { SRLCtx } from '../SRLContext'

export function useLightbox() {
  const ctx = useContext(SRLCtx)

  const openLightbox = slideIndex => {
    ctx.dispatch({ type: 'OPEN_AT_INDEX', index: slideIndex })
  }

  return openLightbox
}
