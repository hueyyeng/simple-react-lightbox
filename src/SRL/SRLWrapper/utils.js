/* ATTACH AN EVENT LISTENER TO AN ELEMENT */
export function handleAttachListener(e, element, callback) {
  e.addEventListener('click', () => {
    // Run the function to handle the clicked item
    if (callback) return callback(element)
  })
}

function loadSingleImage(image) {
  const promise = new Promise(function (resolve, reject) {
    if (image.naturalWidth) {
      // If the browser can determine the naturalWidth the image is already loaded successfully
      resolve(image)
    } else if (image.complete) {
      // If the image is complete but the naturalWidth is 0px it is probably broken
      reject(image)
    } else {
      image.addEventListener('load', fulfill)
      image.addEventListener('error', fulfill)
    }
    function fulfill() {
      if (image.naturalWidth) {
        resolve(image)
      } else {
        reject(image)
      }
      image.removeEventListener('load', fulfill)
      image.removeEventListener('error', fulfill)
    }
  })
  return Object.assign(promise, { image: image })
}

export function loadImages(input) {
  // Momentarily ignore errors
  const reflect = function (img) {
    return loadSingleImage(img).catch(function (error) {
      return error
    })
  }
  const reflected = [].map.call(input, reflect)

  const elements = Promise.all(reflected).then(function (results) {
    const loaded = results.filter(function (x) {
      return x.naturalWidth
    })

    if (loaded.length === results.length) {
      return Promise.resolve(loaded)
    }
    return Promise.reject({
      loaded: loaded,
      errored: results.filter(function (x) {
        return !x.naturalWidth
      })
    })
  })
  // Variables named `tsFix` are only here because TypeScript hates Promise-returning functions.
  return elements
}
