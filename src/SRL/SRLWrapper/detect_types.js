export function isSimpleImage(e) {
  return e.nodeName === 'IMG' && e.parentNode?.nodeName !== 'A'
}

export function isGalleryImage(e) {
  return e.nodeName === 'IMG' && e.parentNode?.nodeName === 'A'
}
