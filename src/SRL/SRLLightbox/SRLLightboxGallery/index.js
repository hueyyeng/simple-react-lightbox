import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { SRLLightboxGalleryStage } from './styles'
import SRLLightboxSlideComponent from './SRLLightboxSlide'
import SRLLightboxControls from './SRLLightboxControls'
import fscreen from 'fscreen'
import panzoom from 'panzoom'
import createActivityDetector from 'activity-detector'

const _findIndex = require('lodash/findIndex')
const _find = require('lodash/find')

const SRLLightboxGallery = ({
  options,
  selectedElement,
  elements,
  isOpened,
  dispatch
}) => {
  // Destructuring the options
  const { autoplaySpeed, enablePanzoom, hideControlsAfter } = options

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
  }, [enablePanzoom, hideControlsAfter, panzoomEnabled])

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

  // Handle Previous Element
  const handlePrevElement = useCallback(
    id => {
      // Reset the panzoom state
      handleDisablePanzoom()
      /* We receive the ID of the current element and we want the element after that.
        Let's find the current position of the current element in the array */
      // const currentPosition = imagesGallery.findIndex(i => i.id === id);
      const currentPosition = _findIndex(elements, function(i) {
        return i.id === id
      })
      /* The prev element will be the prev item in the array but it could be "undefined" as it goes negative. If it does we need to start from the last item. */
      const prevElement =
        elements[currentPosition - 1] || elements[elements.length - 1]
      // Set the state with the new element
      setCurrentElement({
        source: prevElement.source,
        caption: prevElement.caption,
        id: prevElement.id,
        width: prevElement.width,
        height: prevElement.height
      })
    },
    [elements, handleDisablePanzoom]
  )

  // Handle Next element
  const handleNextElement = useCallback(
    id => {
      // Reset the panzoom state
      handleDisablePanzoom()
      /* We receive the ID of the current element and we want the element after that.
      Let's find the current position of the current element in the array */
      const currentPosition = _findIndex(elements, function(i) {
        return i.id === id
      })
      /* The next element will be the next item in the array but it could be "undefined". If it's undefined we know we have reached the end and we go back to the first item */
      const nextElement = elements[currentPosition + 1] || elements[0]
      // Set the state with the new element
      setCurrentElement({
        source: nextElement.source,
        caption: nextElement.caption,
        id: nextElement.id,
        width: nextElement.width,
        height: nextElement.height
      })
    },
    [elements, handleDisablePanzoom]
  )

  // Handle Current Element
  const handleCurrentElement = useCallback(
    id => {
      // Reset the panzoom state
      handleDisablePanzoom()
      // Grab the current element
      const currentElement = _find(elements, function(i) {
        return i.id === id
      })
      // Set the state with the new element
      setCurrentElement({
        source: currentElement.source,
        caption: currentElement.caption,
        id: currentElement.id,
        width: currentElement.width,
        height: currentElement.height
      })
    },
    [elements, handleDisablePanzoom]
  )

  // Handle Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    dispatch({
      type: 'CLOSE_LIGHTBOX'
    })
  }, [dispatch])

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
    if (isOpened) {
      document.body.classList.add('SRLOpened')
      document.addEventListener(
        'keydown',
        handleLightboxWithKeys,
        { once: true },
        false
      )
    }
    // Cleans up function to remove the class from the body
    return function cleanUp() {
      document.body.classList.remove('SRLOpened')
      document.removeEventListener('keydown', handleLightboxWithKeys, false)
    }
  }, [currentElement, elements, handleLightboxWithKeys, isOpened, options])

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
  overlayColor: PropTypes.string,
  selectedElement: PropTypes.object,
  hideControlsAfter: PropTypes.number,
  elements: PropTypes.array,
  isOpened: PropTypes.bool,
  dispatch: PropTypes.func
}

export default SRLLightboxGallery
