import { useContext, useRef, useEffect, useState } from 'react'
import { SRLCtx } from '../SRLContext'

export function useLightbox() {
  const ctx = useContext(SRLCtx)

  const openLightbox = (slideIndex = 0) => {
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

export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref.current ||
          // ref.current.contains(event.target) ||
          event.target.classList.contains('SRLImage') ||
          event.target.classList.contains('SRLPanzoomImage') ||
          event.target.classList.contains('SRLNextButton') ||
          event.target.classList.contains('SRLPrevButton') ||
          event.target.classList.contains('SRLCloseButton') ||
          event.target.classList.contains('SRLAutoplayButton') ||
          event.target.classList.contains('SRLExpandButton') ||
          event.target.classList.contains('SRLZoomOutButton') ||
          event.target.classList.contains('SRLDownloadButton') ||
          event.target.classList.contains('SRLThumbnails') ||
          event.target.classList.contains('SRLThumb') ||
          event.target.classList.contains('SRLCaption') ||
          event.type === 'touchstart' ||
          event.button !== 0
        ) {
          return
        }
        handler(event)
      }
      if (typeof window !== 'undefined') {
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
      }

      return () => {
        if (typeof window !== 'undefined') {
          document.removeEventListener('mousedown', listener)
          document.removeEventListener('touchstart', listener)
        }
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}
