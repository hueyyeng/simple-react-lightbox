export function isSimpleImage(e) {
  return e.nodeName === 'IMG' && e.parentNode?.nodeName !== 'A'
}

export function isGalleryImage(e) {
  return (
    (e.nodeName === 'IMG' &&
      (e.offsetParent?.nodeName === 'A' || e.parentNode?.nodeName === 'A')) ||
    // UGLY FIX FOR GATSBY
    (e.nodeName === 'IMG' &&
      e.parentNode.nodeName === 'PICTURE' &&
      e.parentNode.parentNode.className === 'gatsby-image-wrapper')
  )
}

export function isImageByUser(e) {
  // const regex = /\.(jpeg|jpg|gif|svg|png|webp)\/?$/g
  // return regex.test(e.src)
  return e.src
}
