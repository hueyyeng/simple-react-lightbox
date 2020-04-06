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
import { SRLCtx } from '../../SRLContext'
import panzoom from 'panzoom'
import fscreen from 'fscreen'
import { useIdle, useKeyPressEvent } from 'react-use'

// Lodash helper
import findIndex from 'lodash/findIndex'
const _findIndex = findIndex

const SRLLightboxGallery = ({
  options,
  callbacks,
  selectedElement,
  elements,
  dispatch
}) => {
  // Context
  const ctx = useContext(SRLCtx)

  // Ref for the Image with the panzoom (we define it here as we need it here, but the ref is inside the SRLLightboxSlide component)
  const SRLLightboxImageRef = useRef()

  // Ref for the Image with the panzoom (we define it here as we need it here, but the ref is inside the SRLLightboxSlide component)
  const SRLLightboxPanzoomImageRef = useRef()

  // Ref for the SRLStage
  const SRLStageRef = useRef()

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
  // Let's set a state for the "panzoom" option
  const [panzoomEnabled, setPanzoomEnabled] = useState(false)

  // Check if the user is not taking any action
  const isIdle = useIdle(hideControlsAfter)

  // Method to get the index of a slide
  const getElementIndex = useCallback(
    (id) => {
      const elIndex = _findIndex(elements, function (el) {
        return el.id === id
      })
      return elIndex
    },
    [elements]
  )

  // Handle Panzoom (set the state to true)
  const handlePanzoom = useCallback(
    (value) => {
      if (enablePanzoom) {
        setPanzoomEnabled(value)
      }
    },
    [enablePanzoom]
  )

  // Handle Current Element
  const handleCurrentElement = useCallback(
    (id) => {
      // Reset the panzoom state
      handlePanzoom(false)

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

    [ctx.callbacks, elements, getElementIndex, handlePanzoom, onSlideChange]
  )

  // Handle Previous Element
  const handlePrevElement = useCallback(
    (id) => {
      // Reset the panzoom state
      handlePanzoom(false)

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
    [ctx.callbacks, elements, getElementIndex, handlePanzoom, onSlideChange]
  )

  // Handle Next element
  const handleNextElement = useCallback(
    (id) => {
      // Reset the panzoom state
      handlePanzoom(false)

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
    [ctx.callbacks, elements, getElementIndex, handlePanzoom, onSlideChange]
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

  useInterval(
    () => handleNextElement(currentElement.id),
    autoplay ? autoplaySpeed : null
  )

  // Handle Navigation With Keys
  useKeyPressEvent('ArrowRight', () => handleNextElement(currentElement.id))
  useKeyPressEvent('ArrowUp', () => handleNextElement(currentElement.id))
  useKeyPressEvent('ArrowLeft', () => handlePrevElement(currentElement.id))
  useKeyPressEvent('ArrowDown', () => handlePrevElement(currentElement.id))

  // Handle FullScreen
  function handleFullScreen() {
    let el = ''
    if (typeof window !== 'undefined') {
      el =
        document.querySelector('.SRLImage') ||
        document.querySelector('.SRLPanzoomImage')
    }

    if (el !== null) {
      if (fscreen.fullscreenEnabled) {
        fscreen.addEventListener('fullscreenchange', null, false)
        fscreen.requestFullscreen(el)
      }
    }
  }

  // Handle Idle Off
  function handleOnActive() {
    if (SRLStageRef.current !== null && SRLStageRef.current !== undefined) {
      if (SRLStageRef.current.classList.contains('SRLIdle')) {
        SRLStageRef.current.classList.remove('SRLIdle')
      }
    }
  }

  // Handle Idle On
  function handleOnIdle() {
    if (SRLStageRef.current !== null && SRLStageRef.current !== undefined) {
      SRLStageRef.current.classList.add('SRLIdle')
    }
  }

  useEffect(() => {
    // Initialize the Idle functionality
    if (hideControlsAfter !== 0) {
      if (isIdle) {
        handleOnIdle()
      } else {
        handleOnActive()
      }
    }

    // Initialize the panzoom functionality
    if (enablePanzoom) {
      if (panzoomEnabled) {
        const panzoomElementRef = SRLLightboxPanzoomImageRef.current
        const INITIAL_ZOOM = 1.5

        const panZoomController = panzoom(panzoomElementRef, {
          bounds: true,
          maxZoom: 3,
          minZoom: 0.9
        })

        if (panzoomElementRef !== undefined || panzoomElementRef !== null) {
          // Zoom the image
          panZoomController.zoomAbs(0, 0, INITIAL_ZOOM)
        }
      }
    }

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

    // Adds a class to the body to remove the overflow
    if (typeof window !== 'undefined') {
      document.body.classList.add('SRLOpened')
      document.body.style.overflow = 'hidden'
    }

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
      if (typeof window !== 'undefined') {
        document.body.classList.remove('SRLOpened')
        document.body.style.overflow = null
      }
    }
  }, [
    ctx.callbacks,
    currentElement.id,
    elements,
    onCountSlides,
    onLightboxOpened,
    enablePanzoom,
    panzoomEnabled,
    hideControlsAfter,
    isIdle
  ])

  // Light-box controls
  const controls = {
    currentElementID: currentElement.id,
    handleCurrentElement,
    handleNextElement,
    handlePrevElement,
    handleCloseLightbox,
    handleFullScreen,
    handlePanzoom,
    autoplay,
    panzoomEnabled,
    autoplaySpeed,
    setAutoplay,
    SRLLightboxImageRef,
    SRLLightboxPanzoomImageRef
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
      className="SRLStage"
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
