export function isSimpleImage(e) {
  return e.nodeName === 'IMG' && e.nextSibling?.nodeName !== 'VIDEO'
}

export function isGalleryImage(e) {
  return e.nodeName === 'IMG' && e.parentNode.dataset.attribute === 'SRL'
}

export function isImageWithVideo(e) {
  return e.nodeName === 'IMG' && e.nextSibling?.nodeName === 'VIDEO'
}

export function isVideo(e) {
  return e.nodeName === 'VIDEO' && e.nextSibling?.nodeName !== 'VIDEO'
}
