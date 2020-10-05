export function isSimpleImage(e) {
  return e.img.nodeName === 'IMG' && e.img.parentNode?.nodeName !== 'A'
}

export function isGalleryImage(e) {
  return e.img.nodeName === 'IMG' && e.img.parentNode?.nodeName === 'A'
}
