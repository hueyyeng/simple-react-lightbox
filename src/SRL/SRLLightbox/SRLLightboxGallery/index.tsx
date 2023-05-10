import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useIdle } from 'react-use'
// Lodash helper
import { findIndex } from 'lodash'
import PropTypes from 'prop-types'
import subscribe from 'subscribe-event'
import { useDebouncedCallback } from 'use-debounce'

import { IElement, ISRLLightboxGallery } from '../../../types'
import { SRLCtx } from '../../SRLContext'
import { CLOSE_LIGHTBOX, HANDLE_ELEMENT } from '../../SRLContext/actions'
import { fullscreenError } from '../../SRLErrors'
import { useInterval } from '../../SRLHooks'

import SRLProgressBarComponent from './SRLContainer/SRLProgressBar'
import SRLContainerComponent from './SRLContainer'
import SRLLightboxControls from './SRLLightboxControls'

// CONSTANTS
const NEXT = 'next'
const PREVIOUS = 'previous'

const SRLLightboxGallery = ({
  options,
  callbacks,
  selectedElement,
  elements,
  dispatch
}: ISRLLightboxGallery) => {
  // Context
  const ctx = useContext(SRLCtx)

  /* Ref for the thumbnails div (we will need it in the SRLLightboxControls to calculate the width of the div containing the thumbnails
    and to calculate the height of the image minus the width or the height of the div containing the thumbnails) */
  const SRLThumbnailsRef = useRef<HTMLDivElement | null>(null)

  /* Ref for the caption div (to calculate the height of the image minus the width or the height of the div containing the caption) */
  const SRLCaptionRef = useRef<HTMLDivElement | null>(null)

  // Ref for the SRLStage
  const SRLStageRef = useRef<HTMLDivElement | null>(null)

  // Ref for the subscribe
  const unsubscribe = useRef<() => void | undefined>()

  // Destructuring the options
  const {
    // new
    buttons,
    settings,
    progressBar,
    thumbnails
  } = options

  // Destructuring the callbacks !!!passed by user!!! and we need to check if those are functions
  const { onCountSlides, onSlideChange, onLightboxClosed, onLightboxOpened } =
    callbacks

  // Callbacks functions
  const onChange = useCallback(
    (object: object) => {
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
    (current: object) => {
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
    (current: object) => {
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
    (total: object) => {
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

  // Set a state for the "autoplay" option
  const [autoplay, setAutoplay] = useState(false)

  // Set a state for the "panzoom" option
  const [panzoomEnabled, setPanzoomEnabled] = useState(false)

  // Set the direction of a slide if it comes before or after the current slide
  const [direction, setDirection] = useState<string | undefined>()

  // Set a state for the user to hide/show the thumbnails (not from the option, if they want to hide them on the fly)
  const [hideThumbnails, setHideThumbnails] = useState(false)

  // Check if the user is not taking any action (value in ms)
  const isIdle = useIdle(
    settings.hideControlsAfter < 1000 ? 9999999 : settings.hideControlsAfter
  )

  // Method to get the index of a slide
  const getElementIndex = useCallback(
    (id: string) => {
      const elIndex = findIndex(elements, function (el) {
        return el.id === id
      })
      return elIndex
    },
    [elements]
  )

  // Method to establish if we are selecting an element that comes before or after the current one
  const establishNextOrPrevious = useCallback(
    (
      selectedElementId: string | null,
      currentElementId: string | null,
      knownDirection?: string
    ) => {
      const selectedId = parseInt(selectedElementId || '0')
      const currentId = parseInt(currentElementId || '0')

      /* Because we can't get the ID of a selected element when clicking on the
      "next" and "previous" button, we pass an hard-coded value called "knownDirection"
      as we know that we are definitely running that particular
      function (handleNextElement or handlePreviousElement). If we have this value, skip
      the check all together and immediately set the new direction */
      if (knownDirection) {
        if (knownDirection === NEXT) {
          setDirection(NEXT)
        } else if (knownDirection === PREVIOUS) {
          setDirection(PREVIOUS)
        } else {
          setDirection(undefined)
        }
      } else {
        /* If we are clicking on a thumbnail we can check if the ID of the thumbnail
        that we clicked on is greater o lower than the currentElementID so we can
        establish if it comes after or before it */
        if (selectedId > currentId) {
          setDirection(NEXT)
        } else if (selectedId < currentId) {
          setDirection(PREVIOUS)
        } else {
          setDirection(undefined)
        }
      }
    },
    []
  )

  // Handle Thumbnails
  const handleThumbnails = useCallback(() => {
    setHideThumbnails(!hideThumbnails)
  }, [hideThumbnails])

  // Handle Panzoom
  const handlePanzoom = useCallback(
    (value: boolean) => {
      if (!settings.disablePanzoom) {
        setPanzoomEnabled(value)
      }
    },
    [settings.disablePanzoom]
  )

  // Set the element, reset the panzoom state and determine direction of the slide
  const setElementAndDirection = useCallback(
    (
      elementID: string | null,
      currentID: string | null,
      element: IElement,
      knownDirection?: 'next' | 'previous' | undefined
    ) => {
      handlePanzoom(false)
      establishNextOrPrevious(elementID, currentID, knownDirection)
      dispatch({
        type: HANDLE_ELEMENT,
        element
      })
    },
    [establishNextOrPrevious, handlePanzoom, dispatch]
  )

  // Handle Image Download
  const toDataURL = (url: string): Promise<string> =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
      )

  function handleImageDownload() {
    if (!selectedElement?.source) {
      return
    }

    toDataURL(selectedElement.source).then((dataUrl) => {
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `${ctx.options.settings.downloadedFileName}-${selectedElement.id}`
      a.click()
    })
  }

  // Handle Current Element
  const handleCurrentElement = useCallback(
    (elementID: string, currentID: string) => {
      // Grab the current element index
      const currentElementIndex = getElementIndex(elementID)

      // Grab the current element
      const currentElement = elements[currentElementIndex]

      // Set the state with the new element
      setElementAndDirection(elementID, currentID, currentElement)

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

    [elements, getElementIndex, onChange, setElementAndDirection]
  )

  // Handle Previous Element
  const handlePrevElement = useCallback(
    (elementID: string) => {
      // Get the current element index
      const currentElementIndex = getElementIndex(elementID)

      /* The prev element will be the prev item in the array but it could be "undefined" as it goes negative.
      If it does we need to start from the last item. */
      const prevElement =
        elements[currentElementIndex - 1] || elements[elements.length - 1]

      // Set the state with the new element
      setElementAndDirection(elementID, null, prevElement, 'previous')

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
    [elements, getElementIndex, onChange, setElementAndDirection]
  )

  // Handle Next element
  const handleNextElement = useCallback(
    (elementID: string) => {
      // Get the current element index
      const currentElementIndex = getElementIndex(elementID)

      /* The next element will be the next item in the array but it could be "undefined".
      If it's undefined we know we have reached the end and we go back to the first item */
      const nextElement = elements[currentElementIndex + 1] || elements[0]

      // Set the state with the new element
      setElementAndDirection(elementID, null, nextElement, 'next')

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
    [elements, getElementIndex, onChange, setElementAndDirection]
  )

  // Handle Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    dispatch({
      type: CLOSE_LIGHTBOX
    })
    // Callback
    onClosed({
      opened: false,
      currentSlide: ctx.selectedElement
    })
  }, [dispatch, onClosed, ctx.selectedElement])

  // Handle Autoplay
  useInterval(
    () => handleNextElement(selectedElement.id),
    autoplay ? settings.autoplaySpeed : null,
    selectedElement.id
  )

  // Handle Navigation With Keys
  const handleNavigationWithKeys = useDebouncedCallback(
    // function
    (value: string) => {
      if (value === 'ArrowRight' || value === 'ArrowUp') {
        handleNextElement(selectedElement.id)
      }
      if (value === 'ArrowLeft' || value === 'ArrowDown') {
        handlePrevElement(selectedElement.id)
      }
      if (value === 'Escape') {
        handleCloseLightbox()
      }
    },
    // delay in ms
    300
  )

  // Handle FullScreen
  function handleFullScreen() {
    let el = null
    if (typeof window !== 'undefined') {
      el = document.querySelector('#SRLLightbox')
    }

    if (!document.fullscreenElement) {
      // Stops the autoplay
      setAutoplay(false)

      if (el !== null) {
        try {
          if (
            navigator.userAgent.indexOf('Safari') !== -1 &&
            navigator.userAgent.indexOf('Chrome') === -1
          ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            el.webkitRequestFullScreen()
          } else {
            el.requestFullscreen()
          }
        } catch (error) {
          const message = (error.message =
            'SRL - ERROR WHEN USING FULLSCREEN API')
          fullscreenError(message)
        }
      }
    } else {
      document.exitFullscreen()
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

  // We want this to run only once!
  useEffect(() => {
    // The callbacks below need to be called once (the selected element is only shown one time when the lightbox is opened)
    onOpened({
      opened: true,
      currentSlide: ctx.selectedElement
    })

    // The slide will be counted once when the light-box is opened, there is no way to manipulate the number of slides
    onCount({
      totalSlide: ctx.elements.length
    })
  }, [])

  useEffect(() => {
    // Initialize the Idle functionality
    if (settings.hideControlsAfter !== 0 || !settings.hideControlsAfter) {
      if (isIdle) {
        handleOnIdle()
      } else {
        handleOnActive()
      }
    }

    // Sets the current element to be the first item in the array if the id is undefined.
    // This is crucial in case the user uses the provided method to open the lightbox
    // from a link or a button (using the High Order Component) etc...
    if (selectedElement?.id === undefined) {
      dispatch({
        type: HANDLE_ELEMENT,
        element: {
          source: elements[0].source,
          caption: elements[0].caption,
          id: elements[0].id,
          width: elements[0].width,
          height: elements[0].height,
          type: elements[0].type,
          showControls: elements[0].showControls,
          videoAutoplay: elements[0].videoAutoplay,
          muted: elements[0].muted
        }
      })
    }

    // EVENT LISTENERS
    if (!settings.disableKeyboardControls) {
      unsubscribe.current = subscribe(
        document,
        'keydown',
        (e: KeyboardEvent) => handleNavigationWithKeys(e.key),
        false
      )
    }

    // Cleans up function to remove the class from the body
    return () => {
      if (!settings.disableKeyboardControls && unsubscribe.current) {
        unsubscribe.current()
      }
    }
  }, [
    selectedElement.id,
    elements,
    settings.disablePanzoom,
    settings.disableKeyboardControls,
    panzoomEnabled,
    // panzoomActive,
    settings.hideControlsAfter,
    isIdle,
    handleNavigationWithKeys,
    direction,
    ctx,
    dispatch,
    selectedElement
  ])

  // Light-box controls and settings
  const controls = {
    autoplay,
    buttons,
    currentElementID: selectedElement.id,
    direction,
    handleCloseLightbox,
    handleCurrentElement,
    handleFullScreen,
    handleImageDownload,
    handleNextElement,
    handlePanzoom,
    handlePrevElement,
    handleThumbnails,
    hideThumbnails,
    panzoomEnabled,
    setAutoplay,
    settings,
    SRLThumbnailsRef,
    SRLCaptionRef
  }

  // Light-box buttons options
  const buttonOptions = {
    buttonsBackgroundColor: buttons.backgroundColor,
    buttonsIconColor: buttons.iconColor,
    buttonsSize: buttons.size,
    buttonsIconPadding: buttons.iconPadding,
    // Offset the buttons from the autoplay progress bar
    buttonsOffsetFromProgressBar: progressBar.height,
    showProgressBar: progressBar.showProgressBar,
    translations: ctx.options.translations,
    // Custom Icons
    icons: ctx.options.icons
  }

  return (
    <div ref={SRLStageRef} className="SRLStage">
      {progressBar.showProgressBar && autoplay && (
        <SRLProgressBarComponent
          autoplay={autoplay}
          autoplaySpeed={settings.autoplaySpeed}
          progressBar={progressBar}
          currentElementID={selectedElement.id}
        />
      )}
      <SRLLightboxControls
        {...buttonOptions}
        {...controls}
        thumbnailsPosition={thumbnails.thumbnailsPosition}
        thumbnailsSize={thumbnails.thumbnailsSize}
        showThumbnails={thumbnails.showThumbnails}
        SRLThumbnailsRef={SRLThumbnailsRef}
      />
      <SRLContainerComponent
        {...selectedElement}
        {...controls}
        elements={elements}
        options={options}
      />
    </div>
  )
}

SRLLightboxGallery.propTypes = {
  callbacks: PropTypes.object,
  elements: PropTypes.array,
  isOpened: PropTypes.bool,
  dispatch: PropTypes.func,
  selectedElement: PropTypes.object,
  options: PropTypes.shape({
    thumbnails: PropTypes.shape({
      thumbnailsContainerPadding: PropTypes.string,
      thumbnailsPosition: PropTypes.string,
      thumbnailsSize: PropTypes.array,
      showThumbnails: PropTypes.bool
    }),
    settings: PropTypes.shape({
      overlayColor: PropTypes.string,
      autoplaySpeed: PropTypes.number,
      disableKeyboardControls: PropTypes.bool,
      disablePanzoom: PropTypes.bool,
      limitToBounds: PropTypes.bool,
      hideControlsAfter: PropTypes.number
    }),
    buttons: PropTypes.shape({
      backgroundColor: PropTypes.string,
      iconColor: PropTypes.string,
      iconPadding: PropTypes.string,
      size: PropTypes.string
    }),
    progressBar: PropTypes.shape({
      showProgressBar: PropTypes.bool,
      background: PropTypes.string,
      height: PropTypes.string
    })
  })
}

export default SRLLightboxGallery
