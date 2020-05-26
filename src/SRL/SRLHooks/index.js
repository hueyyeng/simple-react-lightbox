import { useContext, useRef, useEffect, useState, useMemo } from 'react'
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
          event.target.classList.contains('SRLThumbnailsButton') ||
          event.target.classList.contains('SRLCaptionContainer') ||
          event.target.classList.contains('SRLCaptionText') ||
          event.target.classList.contains('SRLCustomCaption') ||
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

export function useSizes(ref) {
  const [sizes, setSizes] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    scrollHeight: 0,
    scrollWidth: 0
  })
  const isClient = typeof window === 'object'

  useEffect(() => {
    if (!ref.current && !isClient) {
      return
    }

    function getSizes() {
      const {
        x,
        y,
        width,
        height,
        top,
        left,
        bottom,
        right
      } = ref.current.getBoundingClientRect()

      return {
        width,
        height,
        scrollWidth: ref.current.scrollWidth,
        scrollHeight: ref.current.scrollHeight,
        x,
        y,
        top,
        left,
        bottom,
        right
      }
    }

    if (ref.current) {
      setSizes(getSizes())
    }

    function handleSizes() {
      if (ref.current) {
        setSizes(getSizes())
      }
    }

    window.addEventListener('resize', handleSizes)
    return () => window.removeEventListener('resize', handleSizes)
  }, [ref, isClient])

  return [sizes]
}
