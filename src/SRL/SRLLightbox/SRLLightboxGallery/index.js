import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext
} from 'react'
import PropTypes from 'prop-types'
import { SRLLightboxGalleryStage } from './styles'
import SRLLightboxSlideComponent from './SRLLightboxSlide'
import SRLLightboxControls from './SRLLightboxControls'
import fscreen from 'fscreen'
import panzoom from 'panzoom'
import createActivityDetector from 'activity-detector'
import { SRLCtx } from '../../SRLContext'

const _findIndex = require('lodash/findIndex')

const SRLLightboxGallery = ({
  options,
  callbacks,
  selectedElement,
  elements,
  dispatch
}) => {
  // Context
  const ctx = useContext(SRLCtx)

  // Destructuring the options
  const { autoplaySpeed, enablePanzoom, hideControlsAfter } = options
  // Destructuring the callbacks passed by user and we need to check if those are functions
  const {
    onCountSlides,
    onSlideChange,
    onLightboxClosed,
    onLightboxOpened
  } = callbacks

  // In this component we set the state using the context.
  // We don't want to manipulate the context every time so we create a localized state
  // The first element will be the one that is clicked
  const [currentElement, setCurrentElement] = useState(selectedElement)
  // Let's set a state for the "autoplay" option
  const [autoplay, setAutoplay] = useState(false)
  // Let's set a state fro the "panzoom" option
  const [panzoomEnabled, setPanzoomEnabled] = useState(false)

  // Ref for the Element
  const SRLElementPanzoomRef = useRef()
  // Ref for the SRLStage
  const SRLStageRef = useRef()

  const getElementIndex = useCallback(
    id => {
      const elIndex = _findIndex(elements, function(el) {
        return el.id === id
      })
      return elIndex
    },
    [elements]
  )

  useEffect(() => {
    // Calculates the start position for the panzoom
    // It has to be different on mobile because the touch event won't zoom the image
    // So the image start position has to be (-101,-101) (which is centered)
    // On desktop we need to double it because the image scale is doubled
    let startPosition
    function mediaQuery(x) {
      if (x.matches) {
        // If media query matches
        startPosition = [-101, -101]
      } else {
        startPosition = [-201, -201]
      }
      return startPosition
    }
    if (enablePanzoom) {
      const x = window.matchMedia('(max-width: 768px)')
      mediaQuery(x)

      // if the state panzoom is enabled (so when the picture is cliked)
      if (panzoomEnabled) {
        const elementRef = SRLElementPanzoomRef.current
        if (elementRef !== null || elementRef !== undefined) {
          elementRef.classList.add('panzoom-enabled')
        }
        const panzoomElement = panzoom(elementRef, {
          bounds: true,
          boundsPadding: 0.6,
          maxZoom: 3,
          minZoom: 1
        })
        panzoomElement.pause()
        if (elementRef !== undefined || elementRef !== null) {
          panzoomElement.resume()
          panzoomElement.zoomAbs(startPosition[0], startPosition[1], 2)
          panzoomElement.moveTo(startPosition[0], startPosition[1])
        }
      }
    }
  }, [
    ctx,
    ctx.callbacks,
    currentElement,
    elements.length,
    enablePanzoom,
    hideControlsAfter,
    onCountSlides,
    panzoomEnabled,
    selectedElement
  ])

  // Handle Panzoom (set the state to true)
  const handlePanzoom = useCallback(() => {
    if (enablePanzoom) {
      setPanzoomEnabled(true)
    }
  }, [enablePanzoom])

  // Disable Panzoom (se the state to false)
  const handleDisablePanzoom = useCallback(() => {
    if (enablePanzoom) {
      setPanzoomEnabled(false)
    }
  }, [enablePanzoom])

  // Handle Current Element
  const handleCurrentElement = useCallback(
    id => {
      // Reset the panzoom state
      handleDisablePanzoom()

      // Grab the current element index
      const currentElementIndex = getElementIndex(id)

      // Grab the current element
      const currentElement = elements[currentElementIndex]

      // Set the state with the new element
      setCurrentElement({
        source: currentElement.source,
        caption: currentElement.caption,
        id: currentElement.id,
        width: currentElement.width,
        height: currentElement.height
      })

      // Callback
      if (typeof onSlideChange === 'function') {
        ctx.callbacks.onSlideChange({
          direction: 'selected',
          slides: {
            previous: elements[currentElementIndex - 1],
            current: currentElement,
            next: elements[currentElementIndex + 1]
          },
          index: currentElementIndex
        })
      }
    },

    [
      ctx.callbacks,
      elements,
      getElementIndex,
      handleDisablePanzoom,
      onSlideChange
    ]
  )

  // Handle Previous Element
  const handlePrevElement = useCallback(
    id => {
      // Reset the panzoom state
      handleDisablePanzoom()

      // Get the current element index
      const currentElementIndex = getElementIndex(id)

      /* The prev element will be the prev item in the array but it could be "undefined" as it goes negative.
      If it does we need to start from the last item. */
      const prevElement =
        elements[currentElementIndex - 1] || elements[elements.length - 1]

      setCurrentElement({
        ...prevElement
      })

      // Callback
      const index =
        currentElementIndex - 1 === -1
          ? elements.length - 1
          : currentElementIndex - 1

      if (typeof onSlideChange === 'function') {
        ctx.callbacks.onSlideChange({
          direction: 'left',
          slides: {
            previous: elements[index - 1],
            current: prevElement,
            next: elements[index + 1]
          },
          index
        })
      }
    },
    [
      ctx.callbacks,
      elements,
      getElementIndex,
      handleDisablePanzoom,
      onSlideChange
    ]
  )

  // Handle Next element
  const handleNextElement = useCallback(
    id => {
      // Reset the panzoom state
      handleDisablePanzoom()

      // Get the current element index
      const currentElementIndex = getElementIndex(id)

      /* The next element will be the next item in the array but it could be "undefined".
      If it's undefined we know we have reached the end and we go back to the first item */
      const nextElement = elements[currentElementIndex + 1] || elements[0]

      // Set the state with the new element
      setCurrentElement({
        ...nextElement
      })

      // Callback
      const index =
        currentElementIndex + 1 === elements.length
          ? 0
          : currentElementIndex + 1
      if (typeof onSlideChange === 'function') {
        ctx.callbacks.onSlideChange({
          direction: 'right',
          slides: {
            previous: elements[index - 1],
            current: nextElement,
            next: elements[index + 1]
          },
          index
        })
      }
    },
    [
      ctx.callbacks,
      elements,
      getElementIndex,
      handleDisablePanzoom,
      onSlideChange
    ]
  )

  // Handle Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    dispatch({
      type: 'CLOSE_LIGHTBOX'
    })
    // Callback
    if (typeof onLightboxClosed === 'function') {
      ctx.callbacks.onLightboxClosed()
    }
  }, [ctx.callbacks, dispatch, onLightboxClosed])

  // Handle Autoplay
  function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        const id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  // Handle Navigation With Keys
  const handleLightboxWithKeys = useCallback(
    event => {
      if (event.keyCode === 39) {
        handleNextElement(currentElement.id)
      } else if (event.keyCode === 37) {
        handlePrevElement(currentElement.id)
      } else if (event.keyCode === 27) {
        handleCloseLightbox()
      }
    },
    [
      currentElement.id,
      handleCloseLightbox,
      handleNextElement,
      handlePrevElement
    ]
  )

  useInterval(
    () => handleNextElement(currentElement.id),
    autoplay ? autoplaySpeed : null
  )

  const handleFullScreen = useCallback(() => {
    const el =
      document.querySelector('.SRLImage') ||
      document.querySelector('.SRLPanzoomImage')
    if (el !== null) {
      if (fscreen.fullscreenEnabled) {
        fscreen.addEventListener('fullscreenchange', null, false)
        fscreen.requestFullscreen(el)
      }
    }
  }, [])

  function handleOnActive() {
    if (hideControlsAfter !== 0) {
      if (SRLStageRef.current !== null && SRLStageRef.current !== undefined) {
        if (SRLStageRef.current.classList.contains('SRLIdle')) {
          SRLStageRef.current.classList.remove('SRLIdle')
        }
      }
    }
  }

  function handleOnIdle() {
    if (hideControlsAfter !== 0) {
      if (SRLStageRef.current !== null && SRLStageRef.current !== undefined) {
        SRLStageRef.current.classList.add('SRLIdle')
      }
    }
  }

  function useIdle(options) {
    useEffect(() => {
      const activityDetector = createActivityDetector(options)
      activityDetector.on('idle', handleOnIdle)
      activityDetector.on('active', handleOnActive)
      return () => activityDetector.stop()
    }, [options])
  }

  useIdle({ timeToIdle: hideControlsAfter, ignoredEventsWhenIdle: [] })

  // This useEffect should only run once!
  useEffect(() => {
    // Sets the current element to be the first item in the array if the id is undefined. This is crucial in case the user uses the provided method to open the lightbox from a link or a button (using the High Order Component) etc...
    if (currentElement.id === undefined) {
      setCurrentElement({
        source: elements[0].source,
        caption: elements[0].caption,
        id: elements[0].id,
        width: elements[0].width,
        height: elements[0].height
      })
    }

    // Adds a class to the body to remove the overflow and compensate for the scroll-bar margin
    document.body.classList.add('SRLOpened')
    document.addEventListener(
      'keydown',
      handleLightboxWithKeys,
      { once: true },
      false
    )

    // Callback
    if (typeof onLightboxOpened === 'function') {
      ctx.callbacks.onLightboxOpened()
    }

    // Callback to count slides
    if (typeof onCountSlides === 'function') {
      ctx.callbacks.onCountSlides(elements.length)
    }

    // Cleans up function to remove the class from the body
    return function cleanUp() {
      document.body.classList.remove('SRLOpened')
      document.removeEventListener('keydown', handleLightboxWithKeys, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Light-box controls
  const controls = {
    currentElementID: currentElement.id,
    handleCurrentElement,
    handleNextElement,
    handlePrevElement,
    handleCloseLightbox,
    handleFullScreen,
    handlePanzoom,
    handleDisablePanzoom,
    autoplay,
    panzoomEnabled,
    autoplaySpeed,
    setAutoplay,
    SRLElementPanzoomRef
  }

  // Light-box buttons options
  const buttonOptions = {
    buttonsBackgroundColor: options.buttonsBackgroundColor,
    buttonsIconColor: options.buttonsIconColor,
    buttonsSize: options.buttonsSize,
    buttonsIconPadding: options.buttonsIconPadding
  }

  return (
    <SRLLightboxGalleryStage
      ref={SRLStageRef}
      overlayColor={options.overlayColor}
    >
      <SRLLightboxControls {...buttonOptions} {...controls} />
      <SRLLightboxSlideComponent
        {...currentElement}
        {...controls}
        elements={elements}
        options={options}
      />
    </SRLLightboxGalleryStage>
  )
}

SRLLightboxGallery.propTypes = {
  options: PropTypes.object,
  callbacks: PropTypes.object,
  overlayColor: PropTypes.string,
  selectedElement: PropTypes.object,
  hideControlsAfter: PropTypes.number,
  elements: PropTypes.array,
  isOpened: PropTypes.bool,
  dispatch: PropTypes.func
}

export default SRLLightboxGallery
