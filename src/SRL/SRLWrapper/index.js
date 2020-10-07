import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SRLCtx } from '../SRLContext'
import loadImage from 'image-promise'
import {
  READY_LIGHTBOX,
  RESET_LIGHTBOX,
  HANDLE_ELEMENT
} from '../SRLContext/actions'
import { GALLERY_IMAGE, IMAGE } from './element_types'
import { dispatchError } from '../SRLErrors'
import { handleAttachListener } from './utils'
import { isSimpleImage, isGalleryImage } from './detect_types'
// IsEqual from lodash to do a deep comparison of the objects
import { isEqual, isEmpty } from 'lodash'

const SRLWrapper = ({
  options,
  callbacks,
  images,
  children,
  defaultOptions,
  defaultCallbacks
}) => {
  // Imports the context
  const context = useContext(SRLCtx)

  // Sets a new Ref which will be used to target the div with the images
  const elementsContainer = useRef(null)
  // Ref for the mutation
  const mutationRef = useRef()
  /* mountedRef is used here to indicate if the component is still mounted.
  If so, we can continue any async call otherwise, skip them. */
  const mountedRef = useRef(true)

  /* RESET THE LIGHTBOX STATUS */
  useEffect(() => {
    try {
      // console.log('RESET')
      context.dispatch({
        type: RESET_LIGHTBOX
      })
    } catch (error) {
      const message = (error.message =
        'SRL - ERROR WHEN RESETTING THE LIGHTBOX STATUS')
      dispatchError(message)
    }
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    /* STARTS SIMPLE REACT LIGHTBOX */
    function handleSRL(array) {
      // Grabs images inside the ref
      const collectedElements = array.querySelectorAll('img')
      // Checks if the are elements in the DOM
      if (collectedElements.length > 0) {
        if (!context.isLoaded) {
          handleImagesLoaded(collectedElements)
        }
        // preventDefault on elements inside the ref
        if (!context.isLoaded) {
          Array.from(collectedElements).map((e) =>
            e.addEventListener('click', (event) => {
              event.preventDefault()
            })
          )
        }
      }
      // User is declaring images via prop
      else {
        if (images) {
          handleImagesPassedViaProps(images)
        }
      }
    }

    /* HANDLE ELEMENTS PASSED BY THE USER VIA PROPS */
    function handleImagesPassedViaProps(array) {
      const elements = array.map((i, index) => {
        // Creates an object for each element
        const element = {
          source: i.src,
          thumbnail: i.thumbnail || i.src,
          caption: i.caption,
          id: `${index}`,
          width: 'auto',
          height: 'auto',
          type: undefined
        }

        return element
      })

      // Function that handle the lightbox
      return handleLightBox(elements)
    }

    /* CREATES AN ARRAY OF IMAGES */
    function handleCreateElements(allImgs) {
      let elements = []
      allImgs.forEach((e) => {
        if (isGalleryImage(e)) {
          elements = [
            ...elements,
            {
              type: GALLERY_IMAGE,
              element: e
            }
          ]
        } else if (isSimpleImage(e)) {
          elements = [
            ...elements,
            {
              type: IMAGE,
              element: e
            }
          ]
        } else {
          elements = [...elements]
        }
      })
      handleElements(elements)
    }

    /* DETECTS IF IMAGES ARE LOADED IN THE DOM AND ARE NOT BROKEN */
    function handleImagesLoaded(allElements) {
      loadImage(allElements)
        .then(function (allImgs) {
          if (!mountedRef.current) return null
          handleCreateElements(allImgs)
        })
        .catch(function (err) {
          if (!mountedRef.current) return null
          handleCreateElements(err.loaded)
        })
    }

    /* DISPATCH THE ACTION TO HANDLE THE ELEMENT */
    const handleElement = (element) => {
      // We don't want to dispatch the action if the selected image is already selected
      if (!isEqual(element, context.selectedElement)) {
        // console.log('dispatched grab element (single)')
        try {
          // console.log('HANDLE ELEMENT')
          context.dispatch({
            type: HANDLE_ELEMENT,
            element
          })
        } catch (error) {
          const message = (error.message =
            'SRL - ERROR WHEN HANDLING THE ELEMENT')
          dispatchError(message)
        }
      }
    }

    /* ADDS ELEMENTS TO THE CONTEXT AND ATTACH AN EVENT LISTENER TO EACH */
    function handleElements(data) {
      let elementId = 0
      const elements = data
        .map(({ element: e, type }) => {
          e.setAttribute('srl_elementid', elementId)
          /* Gatsby Images (Gatsby images creates two images, the first one is in base64 and we
          want to ignore that one but only if it's Gatsby because other base64 images are allowed)
          Also ignores images inside the <picture></picture> tag in Gatsby Images */
          const isBase64Image = e.src?.includes('base64')
          const isGatsbyImage = e.offsetParent?.className.includes(
            'gatsby-image-wrapper'
          )
          const isGatsbyPicture = e.parentNode?.localName !== 'picture'

          if (isGatsbyImage && isBase64Image && isGatsbyPicture) {
            return undefined
          } else {
            elementId++
            switch (type) {
              case IMAGE: {
                const element = {
                  id: e.getAttribute('srl_elementid'),
                  source: e.currentSrc || e.src,
                  caption: e.alt,
                  thumbnail: e.currentSrc || e.src,
                  width: e.naturalWidth,
                  height: e.naturalHeight,
                  type: 'image'
                }
                handleAttachListener(e, element, handleElement)
                return element
              }
              case GALLERY_IMAGE: {
                const element = {
                  id: e.getAttribute('srl_elementid'),
                  source:
                    e.parentElement.href ||
                    e.offsetParent.parentElement.href ||
                    null,
                  caption: e.alt || e.textContent,
                  thumbnail: e.currentSrc || e.parentElement.href,
                  width: null,
                  height: null,
                  type: 'gallery_image'
                }
                handleAttachListener(e, element, handleElement)
                return element
              }
              default: {
                return undefined
              }
            }
          }
        })
        .filter((e) => e !== undefined)

      // Adds elements to the context
      return handleLightBox(elements)
    }

    /* DISPATCH AN ACTION TO GRAB ALL THE ELEMENTS AND THE SETTINGS AND READY THE LIGHTBOX */
    function dispatchLightboxReady(options, callbacks, elements) {
      let _options = {}
      let _callbacks = {}

      if (isEmpty(options)) {
        _options = {
          ...defaultOptions,
          buttons: {
            ...defaultOptions.buttons
          },
          settings: {
            ...defaultOptions.settings
          },
          caption: {
            ...defaultOptions.caption
          },
          thumbnails: {
            ...defaultOptions.thumbnails
          },
          progressBar: {
            ...defaultOptions.progressBar
          }
        }
      } else {
        _options = {
          ...defaultOptions,
          ...options,
          buttons: {
            ...defaultOptions.buttons,
            ...options.buttons
          },
          settings: {
            ...defaultOptions.settings,
            ...options.settings
          },
          caption: {
            ...defaultOptions.caption,
            ...options.caption
          },
          thumbnails: {
            ...defaultOptions.thumbnails,
            ...options.thumbnails
          },
          progressBar: {
            ...defaultOptions.progressBar,
            ...options.progressBar
          }
        }
      }

      if (isEmpty(callbacks)) {
        _callbacks = { ...defaultCallbacks }
      } else {
        _callbacks = { ...defaultCallbacks, ...callbacks }
      }

      const mergedSettings = {
        options: { ..._options },
        callbacks: { ..._callbacks }
      }

      if (
        !isEqual(mergedSettings.options, context.options) ||
        !isEqual(mergedSettings.callbacks, context.callbacks) ||
        !isEqual(elements, context.elements)
      ) {
        try {
          // console.log('READY')
          context.dispatch({
            type: READY_LIGHTBOX,
            mergedSettings,
            elements
          })
        } catch (error) {
          const message = (error.message =
            'SRL - ERROR GRABBING SETTINGS AND ELEMENTS')
          dispatchError(message)
        }
      }
    }

    /* HANDLE THE LIGHTBOX BY DISPATCHING THE TWO ACTIONS */
    function handleLightBox(elements) {
      // Dispatch the actions to grab settings and elements
      // console.log('light-box is initialized')
      return dispatchLightboxReady(options, callbacks, elements)
    }

    /* DETECTS IF THERE ARE MUTATIONS IN THE REF  */
    mutationRef.current = new MutationObserver(detectChanges)
    function detectChanges() {
      // if this runs there has been a mutation
      handleSRL(elementsContainer.current)
    }

    /* OBSERVE THE MUTATION */
    mutationRef.current.observe(elementsContainer.current, {
      childList: true,
      subtree: true,
      attributeFilter: ['href', 'src']
    })

    // RUN THE LIGHTBOX
    handleSRL(elementsContainer.current)
  }, [context, defaultCallbacks, defaultOptions, options, callbacks, images])

  return <div ref={elementsContainer}>{children}</div>
}

export default SRLWrapper

SRLWrapper.propTypes = {
  defaultOptions: PropTypes.shape({
    settings: PropTypes.shape({
      autoplaySpeed: PropTypes.number,
      disableKeyboardControls: PropTypes.bool,
      disablePanzoom: PropTypes.bool,
      disableWheelControls: PropTypes.bool,
      hideControlsAfter: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool
      ]),
      lightboxTransitionSpeed: PropTypes.number,
      lightboxTransitionTimingFunction: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      overlayColor: PropTypes.string,
      slideAnimationType: PropTypes.string,
      slideSpringValues: PropTypes.array,
      slideTransitionSpeed: PropTypes.number,
      slideTransitionTimingFunction: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      usingPreact: PropTypes.bool
    }),
    buttons: PropTypes.shape({
      backgroundColor: PropTypes.string,
      iconColor: PropTypes.string,
      iconPadding: PropTypes.string,
      showAutoplayButton: PropTypes.bool,
      showCloseButton: PropTypes.bool,
      showDownloadButton: PropTypes.bool,
      showFullscreenButton: PropTypes.bool,
      showNextButton: PropTypes.bool,
      showPrevButton: PropTypes.bool,
      showThumbnailsButton: PropTypes.bool,
      size: PropTypes.string
    }),
    caption: PropTypes.shape({
      captionColor: PropTypes.string,
      captionAlignment: PropTypes.string,
      captionFontFamily: PropTypes.string,
      captionFontSize: PropTypes.string,
      captionFontStyle: PropTypes.string,
      captionFontWeight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      captionContainerPadding: PropTypes.string,
      captionTextTransform: PropTypes.string,
      showCaption: PropTypes.bool
    }),
    thumbnails: PropTypes.shape({
      showThumbnails: PropTypes.bool,
      thumbnailsAlignment: PropTypes.string,
      thumbnailsContainerPadding: PropTypes.string,
      thumbnailsContainerBackgroundColor: PropTypes.string,
      thumbnailsGap: PropTypes.string,
      thumbnailsIconColor: PropTypes.string,
      thumbnailsOpacity: PropTypes.number,
      thumbnailsPosition: PropTypes.string,
      thumbnailsSize: PropTypes.array
    }),
    progressBar: PropTypes.shape({
      backgroundColor: PropTypes.string,
      fillColor: PropTypes.string,
      height: PropTypes.string,
      showProgressBar: PropTypes.bool
    })
  }),
  defaultCallbacks: PropTypes.shape({
    onCountSlides: PropTypes.func,
    onLightboxClosed: PropTypes.func,
    onLightboxOpened: PropTypes.func,
    onSlideChange: PropTypes.func
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  options: PropTypes.object,
  callbacks: PropTypes.object,
  images: PropTypes.array
}

SRLWrapper.defaultProps = {
  defaultOptions: {
    settings: {
      autoplaySpeed: 3000,
      disableKeyboardControls: false,
      disablePanzoom: false,
      disableWheelControls: false,
      hideControlsAfter: 3000,
      lightboxTransitionSpeed: 0.3,
      lightboxTransitionTimingFunction: 'linear',
      overlayColor: 'rgba(30, 30, 30, 0.9)',
      slideAnimationType: 'fade',
      slideSpringValues: [300, 50],
      slideTransitionSpeed: 0.6,
      slideTransitionTimingFunction: 'linear',
      usingPreact: false
    },
    buttons: {
      backgroundColor: 'rgba(30,30,36,0.8)',
      iconColor: 'rgba(255, 255, 255, 0.8)',
      iconPadding: '13px',
      showAutoplayButton: true,
      showCloseButton: true,
      showDownloadButton: true,
      showFullscreenButton: true,
      showNextButton: true,
      showPrevButton: true,
      showThumbnailsButton: true,
      size: '40px'
    },
    caption: {
      captionAlignment: 'start',
      captionColor: '#FFFFFF',
      captionContainerPadding: '0',
      captionFontFamily: 'inherit',
      captionFontSize: 'inherit',
      captionFontStyle: 'inherit',
      captionFontWeight: 'inherit',
      captionTextTransform: 'inherit',
      showCaption: true
    },
    thumbnails: {
      showThumbnails: true,
      thumbnailsAlignment: 'center',
      thumbnailsContainerBackgroundColor: 'transparent',
      thumbnailsContainerPadding: '0',
      thumbnailsGap: '0 1px',
      thumbnailsIconColor: '#ffffff',
      thumbnailsOpacity: 0.4,
      thumbnailsPosition: 'bottom',
      thumbnailsSize: ['100px', '80px']
    },
    progressBar: {
      backgroundColor: '#f2f2f2',
      fillColor: '#000000',
      height: '3px',
      showProgressBar: true
    }
  },
  defaultCallbacks: {
    onCountSlides: () => {},
    onSlideChange: () => {},
    onLightboxClosed: () => {},
    onLightboxOpened: () => {}
  }
}
