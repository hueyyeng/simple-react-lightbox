/* ATTACH AN EVENT LISTENER TO AN ELEMENT */
export function handleAttachListener(
  e: EventTarget,
  element: object,
  callback: CallableFunction
): void {
  e.addEventListener('click', () => {
    // Run the function to handle the clicked item
    if (callback) {
      return callback(element)
    }
  })
}

function loadSingleImage(image: HTMLImageElement) {
  const promise = new Promise((resolve, reject) => {
    if (image.loading === 'lazy') {
      resolve(image)
    } else if (image.naturalWidth !== 0) {
      resolve(image)
    } else if (image.complete) {
      reject(undefined)
    } else {
      // Add event listeners
      image.addEventListener('load', imageIsLoaded)
      image.addEventListener('error', imageIsLoaded)
    }

    function imageIsLoaded() {
      if (image.loading === 'lazy') {
        resolve(image)
      } else if (image.naturalWidth !== 0) {
        resolve(image)
      } else {
        reject(undefined)
      }
      // Removes event listeners
      image.removeEventListener('load', imageIsLoaded)
      image.removeEventListener('error', imageIsLoaded)
    }
  })

  return Object.assign(promise, { image: image })
}

export function loadImages(images: NodeListOf<HTMLImageElement>) {
  const checkEachImage = (img: HTMLImageElement) => {
    return loadSingleImage(img).catch((error) => {
      console.error('Unexpected error when loading image!', error)
      return error
    })
  }
  const arrayOfPromises: Array<Promise<HTMLImageElement>> = [].map.call(
    images,
    checkEachImage
  )
  const elements = Promise.all(arrayOfPromises).then((results) => {
    return Promise.resolve(results.filter((e) => e))
  })
  return elements
}
