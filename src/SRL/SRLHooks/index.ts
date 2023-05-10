import { useContext, useEffect, useRef, useState } from 'react'

import { IReducerAction } from '../../types'
import { SRLCtx } from '../SRLContext'
import { CLOSE_LIGHTBOX, OPEN_AT_INDEX } from '../SRLContext/actions'

export function useLightbox() {
  const ctx = useContext(SRLCtx)

  const openLightbox = (slideIndex = 0) => {
    if (ctx.isLoaded) {
      // TODO: FIGURE OUT HOW TO TYPE DATA IREDUCERACTION OPTIONAL KEYS
      const data: IReducerAction = {
        type: OPEN_AT_INDEX,
        index: slideIndex
      }
      ctx.dispatch(data)
    }
  }

  const closeLightbox = () => {
    if (ctx.isLoaded) {
      const data: IReducerAction = {
        type: CLOSE_LIGHTBOX
      }
      ctx.dispatch(data)
    }
  }

  return { openLightbox, closeLightbox }
}

export function useInterval(
  callback: () => void,
  delay: number | null,
  currentID: string
) {
  const savedCallback = useRef<() => void | undefined>()

  // Remember the latest callback and currentID
  useEffect(() => {
    savedCallback.current = callback
  }, [callback, currentID])

  // Set up the interval.
  useEffect(() => {
    const current = savedCallback.current as () => void
    const tick = () => {
      current()
    }

    if (delay) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }

    return () => {}
  }, [delay, currentID])
}

export function useOnClickOutside(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  handler: () => void
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        const target = event.target as HTMLDivElement
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref.current ||
          // ref.current.contains(event.target) ||
          target.classList.contains('SRLImage') ||
          target.classList.contains('SRLPanzoomImage') ||
          target.classList.contains('SRLNextButton') ||
          target.classList.contains('SRLPrevButton') ||
          target.classList.contains('SRLCloseButton') ||
          target.classList.contains('SRLAutoplayButton') ||
          target.classList.contains('SRLExpandButton') ||
          target.classList.contains('SRLZoomOutButton') ||
          target.classList.contains('SRLDownloadButton') ||
          target.classList.contains('SRLThumbnailsButton') ||
          target.classList.contains('SRLCaptionContainer') ||
          target.classList.contains('SRLCaptionText') ||
          target.classList.contains('SRLCustomCaption') ||
          target.classList.contains('SRLThumbnails') ||
          target.classList.contains('SRLThumb') ||
          target.classList.contains('SRLCaption') ||
          target.classList.contains('react-transform-component') ||
          target.classList.contains('react-transform-element') ||
          event.type === 'touchstart' ||
          event.button !== 0
        ) {
          return
        }
        // handler(event)
        handler()
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

export function useSizes(ref: React.RefObject<HTMLDivElement>) {
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
      // TODO: Workaround for VS Code thinking ref.current is still null...
      // well probably from the bad condition check above
      const currentRef = ref.current as HTMLDivElement

      const { x, y, width, height, top, left, bottom, right } =
        currentRef.getBoundingClientRect()

      return {
        width,
        height,
        scrollWidth: currentRef.scrollWidth,
        scrollHeight: currentRef.scrollHeight,
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
