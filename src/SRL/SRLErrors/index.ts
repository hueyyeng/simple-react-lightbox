export function dispatchError(e) {
  console.error(e)
  console.warn(
    'An error as occurred with Simple React Lightbox. Make sure you wrapped your App with the <SimpleReactLightbox> component and then use the <SRLWrapper> component.'
  )
}

export function fullscreenError(e) {
  console.error(e)
  console.warn("Sorry, your browser doesn't support this functionality!")
}

export function initializeError(e) {
  console.error(e)
  console.warn('An error as occurred when initializing Simple React Lightbox')
}
