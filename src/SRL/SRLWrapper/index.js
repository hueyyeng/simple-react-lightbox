import React, { useContext, useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SRLCtx } from '../SRLContext'
import imagesLoaded from 'imagesloaded'
import {
  READY_LIGHTBOX,
  RESET_LIGHTBOX,
  HANDLE_ELEMENT
} from '../SRLContext/actions'
import { GALLERY_IMAGE, IMAGE, VIDEO, EMBED_VIDEO } from './element_types'
import { dispatchError } from '../SRLErrors'

import {
  isSimpleImage,
  isGalleryImage,
  isImageWithVideo,
  isVideo,
  isEmbedVideo
} from './detect_types'
// IsEqual from lodash to do a deep comparison of the objects
import { isEqual, isEmpty } from 'lodash'

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

  console.log('ctx', context)

  // Sets a new Ref which will be used to target the div with the images
  const elementsContainer = useRef(null)
  // Ref for the mutation
  const mutationRef = useRef()
  // Set a state to indicate if the lightbox is initialized
  const [lightboxIsInit, setLightboxIsInit] = useState(false)

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
  }, [])

  useEffect(() => {
    /* STARTS SIMPLE REACT LIGHTBOX */
    function handleSRL(array) {
      // Grabs images and videos inside the ref
      const collectedElements = array.querySelectorAll('img,video')
      // Checks if the are elements in the DOM
      if (collectedElements.length > 0) {
        if (!context.imagesLoaded) {
          handleImagesLoaded(collectedElements).then((result) => {
            handleElements(result)
          })
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

    /* DETECTS IF IMAGES ARE LOADED IN THE DOM AND ARE NOT BROKEN */
    function handleImagesLoaded(array) {
      const imagesLoadedPromise = new Promise(function (resolve, reject) {
        imagesLoaded(array, function (instance) {
          if (instance.isComplete) {
            // We wants all the elements, not only the images as there are also videos
            // We create a new array and we grab the images from the "instance.images" array and the rest from the "instance.elements" array
            let index = -1
            const elements = instance.elements
              .map((e) => {
                if (isEmbedVideo(e)) {
                  index++
                  return {
                    type: EMBED_VIDEO,
                    element: e,
                    isLoaded: 'unknown'
                  }
                } else if (isGalleryImage(e)) {
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
          }
        })
      })
      return imagesLoadedPromise
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

    /* ATTACH AN EVENT LISTENER TO AN ELEMENT */
    function handleAttachListener(e, element) {
      if (!lightboxIsInit) {
        // If it's a video and has a image as thumbnails as sibling
        if (e.previousSibling?.nodeName === 'IMG' && e.nodeName === 'VIDEO') {
          e.previousSibling?.addEventListener('click', () => {
            // Run the function to handle the clicked item
            handleElement(element)
          })
        } else {
          e.addEventListener('click', () => {
            // Run the function to handle the clicked item
            handleElement(element)
          })
        }
      }
    }

    /* ADDS ELEMENTS TO THE CONTEXT AND ATTACH AN EVENT LISTENER TO EACH */
    function handleElements(data) {
      let elementId = 0
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
                  handleAttachListener(e, element)
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
                  handleAttachListener(e, element)
                  return element
                }
                case VIDEO: {
                  const element = {
                    id: e.getAttribute('srl_elementid'),
                    source: e.currentSrc || e.src,
                    caption: e.getAttribute('srl_video_caption'),
                    thumbnail: e.getAttribute('srl_video_thumbnail'),
                    width: e.getAttribute('srl_video_width'),
                    showControls:
                      e.getAttribute('srl_video_controls') == 'true',
                    videoAutoplay:
                      e.getAttribute('srl_video_autoplay') == 'true',
                    muted: e.getAttribute('srl_video_muted') == 'true',
                    type: 'video'
                  }
                  handleAttachListener(e, element)
                  return element
                }
                case EMBED_VIDEO: {
                  const element = {
                    id: e.getAttribute('srl_elementid'),
                    source:
                      e.parentElement.href ||
                      e.offsetParent.parentElement.href ||
                      null,
                    caption: e.parentElement.getAttribute('srl_video_caption'),
                    thumbnail:
                      e.parentElement.getAttribute('srl_video_thumbnail') ||
                      e.currentSrc ||
                      e.src,
                    width: e.parentElement.getAttribute('srl_video_width'),
                    showControls:
                      e.parentElement.getAttribute('srl_video_controls') ==
                      'true',
                    videoAutoplay:
                      e.parentElement.getAttribute('srl_video_autoplay') ==
                      'true',
                    muted:
                      e.parentElement.getAttribute('srl_video_muted') == 'true',
                    type: 'embed_video'
                  }
                  handleAttachListener(e, element)
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

      // Adds elements to the context
      return handleLightBox(elements)
    }

    /* DISPATCH AN ACTION TO GRAB ALL THE ELEMENTS AND THE SETTINGS AND READY THE LIGHTBOX */
    function dispatchLightboxReady(
      options,
      callbacks,
      customCaptions,
      elements
    ) {
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
      if (!lightboxIsInit) {
        // Set the lightbox to be successfully initialized
        setLightboxIsInit(true)

        // Dispatch the actions to grab settings and elements
        // console.log('light-box is initialized')
        return dispatchLightboxReady(
          options,
          callbacks,
          customCaptions,
          elements
        )
      }
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
  }, [
    lightboxIsInit,
    context,
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
