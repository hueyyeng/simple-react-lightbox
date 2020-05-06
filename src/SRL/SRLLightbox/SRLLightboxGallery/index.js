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
import { useIdle } from 'react-use'

// Lodash helper
const findIndex = require('lodash/findIndex')

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
  const {
    // new
    buttons,
    settings
  } = options

  // Destructuring the callbacks !!!passed by user!!! and we need to check if those are functions
  const {
    onCountSlides,
    onSlideChange,
    onLightboxClosed,
    onLightboxOpened
  } = callbacks

  // Callbacks functions
  const onChange = useCallback(
    (object) => {
      if (typeof onSlideChange === 'function') {
        return ctx.callbacks.onSlideChange(object)
      } else {
        console.error(
          `Simple React Lightbox error: you are not passing a function in your "onSlideChange" callback! You are passing a ${typeof onSlideChange}.`
        )
      }
    },
    [ctx.callbacks, onSlideChange]
  )

  const onOpened = useCallback(
    (current) => {
      if (typeof onLightboxOpened === 'function') {
        ctx.callbacks.onLightboxOpened(current)
      } else {
        console.error(
          `Simple React Lightbox error: you are not passing a function in your "onLightboxOpened" callback! You are passing a ${typeof onLightboxOpened}.`
        )
      }
    },
    [ctx.callbacks, onLightboxOpened]
  )

  const onClosed = useCallback(
    (current) => {
      if (typeof onLightboxClosed === 'function') {
        ctx.callbacks.onLightboxClosed(current)
      } else {
        console.error(
          `Simple React Lightbox error: you are not passing a function in your "onLightboxClosed" callback! You are passing a ${typeof onLightboxClosed}.`
        )
      }
    },
    [ctx.callbacks, onLightboxClosed]
  )

  const onCount = useCallback(
    (total) => {
      if (typeof onCountSlides === 'function') {
        ctx.callbacks.onCountSlides(total)
      } else {
        console.error(
          `Simple React Lightbox error: you are not passing a function in your "onCountSlides" callback! You are passing a ${typeof onCountSlides}.`
        )
      }
    },
    [ctx.callbacks, onCountSlides]
  )

  // In this component we set the state using the context.
  // We don't want to manipulate the context every time so we create a localized state
  // The first element will be the one that is clicked
  const [currentElement, setCurrentElement] = useState(selectedElement)
  // Let's set a state for the "autoplay" option
  const [autoplay, setAutoplay] = useState(false)
  // Let's set a state for the "panzoom" option
  const [panzoomEnabled, setPanzoomEnabled] = useState(false)

  // Check if the user is not taking any action
  const isIdle = useIdle(
    buttons.hideButtonsAfter < 1000 ? 9999999 : buttons.hideButtonsAfter
  )

  // Method to get the index of a slide
  const getElementIndex = useCallback(
    (id) => {
      const elIndex = findIndex(elements, function (el) {
        return el.id === id
      })
      return elIndex
    },
    [elements]
  )

  // Handle Panzoom (set the state to true)
  const handlePanzoom = useCallback(
    (value) => {
      if (settings.enablePanzoom) {
        setPanzoomEnabled(value)
      }
    },
    [settings.enablePanzoom]
  )

  // Handle Image Download
  function toDataURL(url) {
    return fetch(url)
      .then((response) => {
        return response.blob()
      })
      .then((blob) => {
        return URL.createObjectURL(blob)
      })
  }

  async function handleImageDownload() {
    const a = document.createElement('a')
    a.href = await toDataURL(currentElement.source)
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

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
      onChange({
        action: 'selected',
        slides: {
          previous: elements[currentElementIndex - 1],
          current: currentElement,
          next: elements[currentElementIndex + 1]
        },
        index: currentElementIndex
      })
    },

    [elements, getElementIndex, handlePanzoom, onChange]
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
      onChange({
        action: 'left',
        slides: {
          previous: elements[index - 1],
          current: prevElement,
          next: elements[index + 1]
        },
        index
      })
    },
    [elements, getElementIndex, handlePanzoom, onChange]
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

      onChange({
        action: 'right',
        slides: {
          previous: elements[index - 1],
          current: nextElement,
          next: elements[index + 1]
        },
        index
      })
    },
    [elements, getElementIndex, handlePanzoom, onChange]
  )

  // Handle Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    dispatch({
      type: 'CLOSE_LIGHTBOX'
    })
    // Callback
    onClosed({
      opened: false,
      currentSlide: ctx.selectedElement
    })
  }, [dispatch, onClosed, ctx.selectedElement])

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
    autoplay ? settings.autoplaySpeed : null
  )

  // Handle Navigation With Keys
  const handleNavigationWithKeys = useCallback(
    (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        handleNextElement(currentElement.id)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        handlePrevElement(currentElement.id)
      }
      if (e.key === 'Escape') {
        handleCloseLightbox()
      }
    },
    [
      handleNextElement,
      handlePrevElement,
      handleCloseLightbox,
      currentElement.id
    ]
  )

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

  // We want this to run only once
  useEffect(() => {
    onOpened({
      opened: true,
      currentSlide: ctx.selectedElement
    })

    onCount({
      totalSlide: ctx.elements.length
    })
  }, [])

  useEffect(() => {
    // Initialize the Idle functionality
    if (buttons.hideButtonsAfter !== 0 || !buttons.hideButtonsAfter) {
      if (isIdle) {
        handleOnIdle()
      } else {
        handleOnActive()
      }
    }

    // Initialize the panzoom functionality
    if (settings.enablePanzoom) {
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
          panZoomController.moveTo(0, 0)
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

    // EVENT LISTENERS
    if (!settings.disableKeyboardControls) {
      document.addEventListener('keydown', handleNavigationWithKeys, false)
    }

    // Adds a class to the body to remove the overflow
    if (typeof window !== 'undefined') {
      document.body.classList.add('SRLOpened')
      document.body.style.overflow = 'hidden'
    }

    // Cleans up function to remove the class from the body
    return function cleanUp() {
      if (typeof window !== 'undefined') {
        document.body.classList.remove('SRLOpened')
        document.body.style.overflow = null
      }
      document.removeEventListener('keydown', handleNavigationWithKeys, false)
    }
  }, [
    ctx.callbacks,
    currentElement.id,
    elements,
    settings.enablePanzoom,
    settings.disableKeyboardControls,
    panzoomEnabled,
    buttons.hideButtonsAfter,
    isIdle,
    handleNavigationWithKeys
  ])

  // Light-box controls
  const controls = {
    currentElementID: currentElement.id,
    handleCurrentElement,
    handleNextElement,
    handlePrevElement,
    handleCloseLightbox,
    handleFullScreen,
    handleImageDownload,
    handlePanzoom,
    autoplay,
    panzoomEnabled,
    settings,
    buttons,
    setAutoplay,
    SRLLightboxImageRef,
    SRLLightboxPanzoomImageRef
  }

  // Light-box buttons options
  const buttonOptions = {
    buttonsBackgroundColor: options.buttons.backgroundColor,
    buttonsIconColor: options.buttons.iconColor,
    buttonsSize: options.buttons.size,
    buttonsIconPadding: options.buttons.iconPadding
  }

  return (
    <SRLLightboxGalleryStage
      ref={SRLStageRef}
      overlayColor={options.settings.overlayColor}
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
  callbacks: PropTypes.object,
  elements: PropTypes.array,
  isOpened: PropTypes.bool,
  dispatch: PropTypes.func,
  selectedElement: PropTypes.object,
  options: PropTypes.shape({
    settings: PropTypes.shape({
      overlayColor: PropTypes.string,
      autoplaySpeed: PropTypes.number,
      disableKeyboardControls: PropTypes.bool,
      enablePanzoom: PropTypes.bool
    }),
    buttons: PropTypes.shape({
      backgroundColor: PropTypes.string,
      hideButtonsAfter: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
      iconColor: PropTypes.string,
      iconPadding: PropTypes.string,
      size: PropTypes.string
    })
  })
}

export default SRLLightboxGallery
