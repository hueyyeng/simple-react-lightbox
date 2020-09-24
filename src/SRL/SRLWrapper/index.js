import React, { useContext, useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SRLCtx } from '../SRLContext'
import imagesLoaded from 'imagesloaded'
import {
  GRAB_SETTINGS,
  GRAB_ELEMENTS,
  HANDLE_ELEMENT
} from '../SRLContext/actions'
import { GALLERY_IMAGE, IMAGE, VIDEO } from './element_types'
import {
  isSimpleImage,
  isGalleryImage,
  isImageWithVideo,
  isVideo
} from './detect_types'

// IsEqual from lodash to do a deep comparison of the objects
const isEqual = require('lodash/isEqual')
const isEmpty = require('lodash/isEmpty')

const SRLWrapper = ({
  options,
  callbacks,
  images,
  children,
  defaultOptions,
  defaultCallbacks,
  customCaptions
}) => {
  // Imports the context
  const context = useContext(SRLCtx)

  console.log(context.elements)

  // Sets a new Ref which will be used to target the div with the images
  const elementsContainer = useRef(null)
  // Ref for the mutation
  const mutationRef = useRef()

  const [imagesAreLoaded, setImagesAreLoaded] = useState(false)
  const [lightboxIsInit, setLightboxIsInit] = useState(false)

  useEffect(() => {
    // Mutation Observer
    mutationRef.current = new MutationObserver(detectChanges)

    // Detect if there are mutations in the SRLWrapper ref
    function detectChanges() {
      // if this runs there has been a mutation
      handleDetectTypeOfElements(elementsContainer.current)
    }

    // Declare what to observe
    mutationRef.current.observe(elementsContainer.current, {
      childList: true,
      subtree: true,
      attributeFilter: ['href', 'src']
    })

    // 4.5) Dispatch the action to grab the options
    function dispatchGrabSettings(options, callbacks, customCaptions) {
      // console.log('dispatched options')
      // We merge the settings that we receive from the user via the props with the original ones (defaultOptions and defaultCallbacks)
      // If the user hasn't provided any options/callbacks via props we make mergedSettings use just the default options/callbacks

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
          },
          translations: {
            ...defaultOptions.translations
          },
          icons: {
            ...defaultOptions.icons
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
          },
          translations: {
            ...defaultOptions.translations,
            ...options.translations
          },
          icons: {
            ...defaultOptions.icons,
            ...options.icons
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
        callbacks: { ..._callbacks },
        customCaptions: [...customCaptions]
      }

      if (
        !isEqual(mergedSettings.options, context.options) ||
        !isEqual(mergedSettings.callbacks, context.callbacks)
      ) {
        context.dispatch({
          type: GRAB_SETTINGS,
          mergedSettings
        })
      }
    }

    // 4.5) Dispatch the action to handle the elements
    function dispatchAddElements(elements) {
      if (!isEqual(elements, context.elements)) {
        // console.log('dispatched grab elements')
        context.dispatch({
          type: GRAB_ELEMENTS,
          elements
        })
      }
    }

    // 4) Finally handle the lightbox by dispatching the actions to the context
    function handleLightBox(elements) {
      // Set the lightbox to be successfully initialized
      setLightboxIsInit(true)

      if (!lightboxIsInit) {
        // Dispatch the actions to grab settings and elements
        // console.log('light-box is initialized')
        return (
          dispatchAddElements(elements.filter((e) => e !== undefined)),
          dispatchGrabSettings(options, callbacks, customCaptions)
        )
      }
    }

    // 3.5) Dispatch the Action to handle the clicked item
    const handleElement = (element) => {
      // We don't want to dispatch the action if the selected image is already selected
      if (!isEqual(element, context.selectedElement)) {
        // console.log('dispatched grab element (single)')
        context.dispatch({
          type: HANDLE_ELEMENT,
          element
        })
      }
    }

    // 3.2.5) If the user passes the images via props, handle them
    function handleImagesPassedViaProps(array) {
      const elements = array.map((i, index) => {
        // Creates an object for each element
        const element = {
          source: i.src,
          thumbnail: i.thumbnail || i.src,
          caption: i.caption,
          id: `${index}`,
          width: 'auto',
          height: 'auto'
        }

        return element
      })

      // Function that handle the lightbox
      return handleLightBox(elements)
    }

    // 3.1.1) Prevents clicking on the element and instead handle it
    function handlePreventClick(e, element) {
      if (e.previousSibling?.nodeName === 'IMG' && e.nodeName === 'VIDEO') {
        e.previousSibling.addEventListener('click', (e) => {
          // Prevent the element from opening
          e.preventDefault()
          // Run the function to handle the clicked item
          handleElement(element)
        })
      } else {
        e.addEventListener('click', (e) => {
          // Prevent the element from opening
          e.preventDefault()
          // Run the function to handle the clicked item
          handleElement(element)
        })
      }
    }

    // 3) Adds the elements to the "context" and add the eventListener to open the lightbox to each element
    function handleElements(data) {
      let elementId = 0

      // console.log(data)

      const elements = data
        .map(({ element: e, isLoaded, type }) => {
          e.setAttribute('srl_elementid', elementId)

          if (isLoaded) {
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
                  handlePreventClick(e, element)
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
                  handlePreventClick(e, element)
                  return element
                }
                case VIDEO: {
                  const element = {
                    id: e.getAttribute('srl_elementid'),
                    source: e.currentSrc || e.src,
                    caption: e.getAttribute('srl_video_caption'),
                    thumbnail: e.getAttribute('srl_video_thumbnail'),
                    width: e.getAttribute('srl_video_width'),
                    height: e.getAttribute('srl_video_height'),
                    showControls:
                      e.getAttribute('srl_video_controls') == 'true',
                    autoPlay: e.getAttribute('srl_video_autoplay') == 'true',
                    muted: e.getAttribute('srl_video_muted') == 'true',
                    type: 'video'
                  }
                  handlePreventClick(e, element)
                  return element
                }
                default: {
                  return undefined
                }
              }
            }
          }
        })
        .filter((e) => e !== undefined)

      return handleLightBox(elements)
    }

    // 2.5) When elements are not loaded prevent them from being clicked
    function handleLightboxNotLoaded(array) {
      Array.from(array).map((e) =>
        e.addEventListener('click', (event) => {
          event.preventDefault()
        })
      )
    }

    // 2) Detected if images are loaded in the DOM
    function handleImagesLoaded(array) {
      const imagesLoadedPromise = new Promise(function (resolve, reject) {
        imagesLoaded(array, function (instance) {
          if (instance.isComplete) {
            if (!imagesAreLoaded) {
              // We wants all the elements, not only the images, as we can now have videos too
              // But we still want to validate the images so we need to merge the merge the two arrays
              // We create a new array and we grab the images from the "instance.images" array and the rest from the "instance.elements" array
              let index = -1
              const elements = instance.elements
                .map((e) => {
                  if (isGalleryImage(e)) {
                    index++
                    return {
                      type: GALLERY_IMAGE,
                      element: instance.images[index].img,
                      isLoaded: instance.images[index].isLoaded
                    }
                  } else if (isSimpleImage(e)) {
                    index++
                    return {
                      type: IMAGE,
                      element: instance.images[index].img,
                      isLoaded: instance.images[index].isLoaded
                    }
                  } else if (isImageWithVideo(e)) {
                    index++
                    return undefined
                  } else if (isVideo(e)) {
                    return {
                      type: VIDEO,
                      element: e,
                      isLoaded: 'unknown'
                    }
                  } else {
                    return undefined
                  }
                })
                .filter((e) => e !== undefined)
              resolve(elements)
            } else {
              handleLightboxNotLoaded(array)
            }
          }
        })
      })
      return imagesLoadedPromise
    }

    // 1) Detected the type of element (if the user is using the "GALLERY" approach)
    function handleDetectTypeOfElements(array) {
      // Grabs images in the ref
      const collectedElements = array.querySelectorAll('img,video')
      // Grabs data attributes (in links) in the ref

      // Checks if the are elements in the DOM first of all
      if (collectedElements.length > 0) {
        handleImagesLoaded(collectedElements).then((result) => {
          handleElements(result)
          setImagesAreLoaded(true)
        })
      }
      // USER IS DECLARING IMAGES VIA PROPS
      else {
        if (images) {
          handleImagesPassedViaProps(images)
        }
      }
    }

    // RUN THE LIGHTBOX
    handleDetectTypeOfElements(elementsContainer.current)
  }, [
    lightboxIsInit,
    context,
    imagesAreLoaded,
    defaultCallbacks,
    defaultOptions,
    options,
    callbacks,
    images,
    customCaptions
  ])

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
      ])
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
      thumbnailsOpacity: PropTypes.number,
      thumbnailsPosition: PropTypes.string,
      thumbnailsSize: PropTypes.array
    }),
    progressBar: PropTypes.shape({
      backgroundColor: PropTypes.string,
      fillColor: PropTypes.string,
      height: PropTypes.string,
      showProgressBar: PropTypes.bool
    }),
    translations: PropTypes.shape({
      autoplayText: PropTypes.string,
      closeText: PropTypes.string,
      downloadText: PropTypes.string,
      fullscreenText: PropTypes.string,
      nextText: PropTypes.string,
      pauseText: PropTypes.string,
      previousText: PropTypes.string,
      thumbnailsText: PropTypes.string,
      zoomOutText: PropTypes.string
    }),
    icons: PropTypes.shape({
      autoplayIcons: PropTypes.string,
      closeIcons: PropTypes.string,
      downloadIcons: PropTypes.string,
      fullscreenIcons: PropTypes.string,
      nextIcons: PropTypes.string,
      pauseIcons: PropTypes.string,
      previousIcons: PropTypes.string,
      thumbnailsIcons: PropTypes.string,
      zoomOutIcons: PropTypes.string
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
  images: PropTypes.array,
  customCaptions: PropTypes.array
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
      slideTransitionTimingFunction: 'linear'
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
      thumbnailsOpacity: 0.4,
      thumbnailsPosition: 'bottom',
      thumbnailsSize: ['100px', '80px']
    },
    progressBar: {
      backgroundColor: '#f2f2f2',
      fillColor: '#000000',
      height: '3px',
      showProgressBar: true
    },
    translations: {
      autoplayText: 'Play',
      closeText: 'Close',
      downloadText: 'Download',
      fullscreenText: 'Full screen',
      nextText: 'Next',
      pauseText: 'Pause',
      previousText: 'Previous',
      thumbnailsText: 'Hide thumbnails',
      zoomOutText: 'Zoom Out'
    },
    icons: {
      autoplayIcon: null,
      closeIcon: null,
      downloadIcon: null,
      fullscreenIcon: null,
      nextIcon: null,
      pauseIcon: null,
      previousIcon: null,
      thumbnailsIcon: null,
      zoomOutIcon: null
    }
  },
  defaultCallbacks: {
    onCountSlides: () => {},
    onSlideChange: () => {},
    onLightboxClosed: () => {},
    onLightboxOpened: () => {}
  },
  customCaptions: [{}]
}
