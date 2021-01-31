/* ATTACH AN EVENT LISTENER TO AN ELEMENT */
export function handleAttachListener(e, element, callback) {
  e.addEventListener('click', () => {
    // Run the function to handle the clicked item
    if (callback) return callback(element)
  })
}

function loadSingleImage(image) {
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

export function loadImages(input) {
  const checkEachImage = (img) => {
    return loadSingleImage(img).catch(function (error) {
      return error
    })
  }
  const arrayOfPromises = [].map.call(input, checkEachImage)
  const elements = Promise.all(arrayOfPromises).then(function (results) {
    return Promise.resolve(results.filter((e) => e))
  })
  return elements
}
