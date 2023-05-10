import { useContext, useEffect, useRef } from 'react'
// IsEqual from lodash to do a deep comparison of the objects
import { isEmpty, isEqual } from 'lodash'
import PropTypes from 'prop-types'

import {
  IArrayImage,
  ICallbacks,
  IElement,
  IOptions,
  IReducerAction,
  ISRLWrapper
} from '../../types'
import { SRLCtx } from '../SRLContext'
import {
  HANDLE_ELEMENT,
  READY_LIGHTBOX,
  RESET_LIGHTBOX
} from '../SRLContext/actions'
import { dispatchError } from '../SRLErrors'

import {
  isGalleryImage,
  isGatsbyGalleryImage,
  isImageByUser,
  isSimpleImage
} from './detect_types'
import { GALLERY_IMAGE, IMAGE } from './element_types'
import { loadImages } from './utils'
import { handleAttachListener } from './utils'

type TGalleryImage = HTMLAnchorElement | undefined

const SRLWrapper = ({
  options,
  callbacks,
  elements,
  children,
  defaultOptions,
  defaultCallbacks
}: ISRLWrapper) => {
  // Imports the context
  const context = useContext(SRLCtx)

  // Sets a new Ref which will be used to target the div with the images
  const elementsContainer = useRef<HTMLDivElement | null>(null)

  // Ref for the mutation
  const mutationRef = useRef<MutationObserver | null>(null)

  /* mountedRef is used here to indicate if the component is still mounted.
  If so, we can continue any async call otherwise, skip them. */
  const mountedRef = useRef(true)

  /* RESET THE LIGHTBOX STATUS */
  useEffect(() => {
    try {
      // console.log('RESET')
      const data: IReducerAction = {
        type: RESET_LIGHTBOX
      }
      context.dispatch(data)
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

    function handleSRL(array: ParentNode | null) {
      if (!array) {
        return
      }

      // Grabs images inside the ref
      const collectedImgElements = array.querySelectorAll('img')
      // Checks if the are elements in the DOM
      if (collectedImgElements.length > 0) {
        if (!context.isLoaded) {
          handleImagesLoaded(collectedImgElements)
          // preventDefault on elements inside the ref
          Array.from(collectedImgElements).map((e) =>
            e.addEventListener('click', (event) => {
              event.preventDefault()
            })
          )
        }
      }
      // User is declaring images via prop
      else {
        if (elements) {
          handleElementsPassedViaProps(elements)
        }
      }
    }

    /* HANDLE ELEMENTS PASSED BY THE USER VIA PROPS */
    function handleElementsPassedViaProps(array: Array<IElement>) {
      const elements = array
        .map((e, index) => {
          if (isImageByUser(e)) {
            const data: IElement = {
              id: `${index}`,
              src: e.src,
              source: e.src || '',
              caption: e.caption || '',
              thumbnail: e.thumbnail || e.src || '',
              type: 'image'
            }
            return data
          } else {
            return undefined
          }
        })
        .filter((e): e is IElement => e !== undefined)

      // Function that handle the lightbox
      return handleLightBox(elements)
    }

    /* CREATES AN ARRAY OF IMAGES */
    function handleCreateElements(allImgs: HTMLImageElement[]) {
      let elements: Array<IArrayImage> = []
      allImgs.forEach((e) => {
        if (isGalleryImage(e) || isGatsbyGalleryImage(e)) {
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
    function handleImagesLoaded(allElements: NodeListOf<HTMLImageElement>) {
      return loadImages(allElements).then((allImgs) => {
        if (!mountedRef.current) {
          return null
        }
        return handleCreateElements(allImgs)
      })
    }

    /* DISPATCH THE ACTION TO HANDLE THE ELEMENT */
    const handleElement = (element: IElement) => {
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
          const message = 'SRL - ERROR WHEN HANDLING THE ELEMENT'
          dispatchError(message)
        }
      }
    }

    /* ADDS ELEMENTS TO THE CONTEXT AND ATTACH AN EVENT LISTENER TO EACH */
    function handleElements(
      data: Array<{ element: HTMLImageElement; type: string }>
    ) {
      let elementId = 0
      const elements = data
        .map(({ element: e, type }) => {
          if (e.ariaHidden) {
            return undefined
          }

          e.setAttribute('srl_elementid', elementId.toString())

          /* Gatsby Images (Gatsby images creates two images, the first one is in base64 and we
          want to ignore that one but only if it's Gatsby because other base64 images are allowed)
          Also ignores images inside the <picture></picture> tag in Gatsby Images */
          const isBase64Image = e.src?.includes('base64')
          const isSVGImage = e.src?.includes('svg+xml')
          const isGatsbyImage = e.offsetParent?.className.includes(
            'gatsby-image-wrapper'
          )
          const isGatsbyPicture = e.parentElement?.localName !== 'picture'

          /* Next.js version 10 include an Image component which has a div with another image with a role of presentation that shouldn't be included */
          const isNextJsImage = e.getAttribute('role') === 'presentation'
          const isNextJsTransparentImage =
            e.src?.includes('data:image/gif') ||
            e.src?.includes('data:image/svg+xml;base64')

          if (
            (isGatsbyImage &&
              (isBase64Image || isSVGImage) &&
              isGatsbyPicture) ||
            isNextJsImage ||
            isNextJsTransparentImage
          ) {
            return undefined
          } else {
            elementId++

            const parentElement = e.parentElement as TGalleryImage
            const offsetParentElement = e.offsetParent
              ?.parentElement as TGalleryImage
            const offsetParent = e.offsetParent as TGalleryImage
            const gatsbyParent = e.parentElement?.parentElement
              ?.parentElement as TGalleryImage

            switch (type) {
              case IMAGE: {
                const element: IElement = {
                  id: elementId.toString(),
                  src: e.src || e.currentSrc,
                  source: e.src || e.currentSrc,
                  caption: e.alt,
                  thumbnail: e.src || e.currentSrc,
                  width: e.naturalWidth,
                  height: e.naturalHeight,
                  type: 'image'
                }
                handleAttachListener(e, element, handleElement)
                return element
              }
              case GALLERY_IMAGE: {
                const element: IElement = {
                  id: elementId.toString(),
                  src: '',
                  source:
                    (parentElement && parentElement.href) ||
                    (offsetParentElement && offsetParentElement.href) ||
                    (offsetParent && offsetParent.href) ||
                    (gatsbyParent && gatsbyParent.href) || // UGLY FIX FOR GATSBY
                    e.src ||
                    e.currentSrc ||
                    undefined,
                  caption: e.alt || e.textContent || undefined,
                  thumbnail:
                    (parentElement && parentElement.href) ||
                    (offsetParentElement && offsetParentElement.href) ||
                    (offsetParent && offsetParent.href) ||
                    (gatsbyParent && gatsbyParent.href) || // UGLY FIX FOR GATSBY
                    e.src ||
                    e.currentSrc ||
                    undefined,
                  width: undefined,
                  height: undefined,
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
        .filter((newElement) => newElement !== undefined) as IElement[]

      // Adds elements to the context
      return handleLightBox(elements)
    }

    /* DISPATCH AN ACTION TO GRAB ALL THE ELEMENTS AND THE SETTINGS AND READY THE LIGHTBOX */
    function dispatchLightboxReady(
      options: IOptions,
      callbacks: ICallbacks,
      elements: Array<IElement>
    ) {
      let _options = {} as IOptions
      let _callbacks = {} as ICallbacks

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
    function handleLightBox(elements: Array<IElement>) {
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
    mutationRef.current?.observe(elementsContainer.current as Node, {
      childList: true,
      subtree: true,
      attributeFilter: ['href', 'src']
    })

    // RUN THE LIGHTBOX
    handleSRL(elementsContainer.current)
  }, [context, defaultCallbacks, defaultOptions, options, callbacks, elements])

  return <div ref={elementsContainer}>{children}</div>
}

export default SRLWrapper

SRLWrapper.propTypes = {
  defaultOptions: PropTypes.shape({
    settings: PropTypes.shape({
      autoplaySpeed: PropTypes.number,
      boxShadow: PropTypes.string,
      removeScrollBar: PropTypes.bool,
      disableKeyboardControls: PropTypes.bool,
      disablePanzoom: PropTypes.bool,
      disableWheelControls: PropTypes.bool,
      downloadedFileName: PropTypes.string,
      hideControlsAfter: PropTypes.number,
      lightboxTransitionSpeed: PropTypes.number,
      lightboxTransitionTimingFunction: PropTypes.string,
      limitToBounds: PropTypes.bool,
      overlayColor: PropTypes.string,
      slideAnimationType: PropTypes.string,
      slideSpringValues: PropTypes.array,
      slideTransitionSpeed: PropTypes.number,
      slideTransitionTimingFunction: PropTypes.string,
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
  elements: PropTypes.arrayOf(PropTypes.element)
}

export const defaultOptions = {
  settings: {
    autoplaySpeed: 3000,
    boxShadow: 'none',
    removeScrollBar: true,
    disableKeyboardControls: false,
    disablePanzoom: false,
    disableWheelControls: false,
    downloadedFileName: 'SRL-image',
    hideControlsAfter: 3000,
    limitToBounds: false,
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
    iconPadding: '10px',
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
    captionContainerPadding: '20px 0 30px 0',
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
    thumbnailsSize: ['100px', '80px'] as [string, string]
  },
  progressBar: {
    backgroundColor: '#f2f2f2',
    fillColor: '#000000',
    height: '3px',
    showProgressBar: true
  }
}

export const defaultCallbacks = {
  onCountSlides: () => {},
  onSlideChange: () => {},
  onLightboxClosed: () => {},
  onLightboxOpened: () => {}
}

SRLWrapper.defaultProps = {
  defaultOptions: defaultOptions,
  defaultCallbacks: defaultCallbacks
}
