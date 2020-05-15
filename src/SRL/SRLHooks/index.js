import { useContext, useRef, useEffect } from 'react'
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

export function useInterval(callback, delay, currentID) {
  const savedCallback = useRef()

  // Remember the latest callback and currentID
  useEffect(() => {
    savedCallback.current = callback
  }, [callback, currentID])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, currentID])
}
