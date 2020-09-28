export function isSimpleImage(e) {
  return (
    e.nodeName === 'IMG' &&
    e.nextSibling?.nodeName !== 'VIDEO' &&
    e.parentNode?.nodeName !== 'A'
  )
}

export function isGalleryImage(e) {
  return e.nodeName === 'IMG' && e.parentNode?.nodeName === 'A'
}

export function isImageWithVideo(e) {
  return e.nodeName === 'IMG' && e.nextSibling?.nodeName === 'VIDEO'
}

export function isVideo(e) {
  return e.nodeName === 'VIDEO' && e.nextSibling?.nodeName !== 'VIDEO'
}

export function isEmbeddedVideo(e) {
  return e.nodeName === 'IMG' && e.parentNode?.getAttribute('srl_embed_video')
}
