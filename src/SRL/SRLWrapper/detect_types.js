export function isSimpleImage(e) {
  return (
    e.nodeName === 'IMG' &&
    e.nextSibling?.nodeName !== 'VIDEO' &&
    e.parentNode?.nodeName !== 'A'
  )
}

export function isGalleryImage(e) {
  const regex = /(https?:\/\/)www.(youtube.com\/watch[?]v=([a-zA-Z0-9_-]{11}))|https?:\/\/(www.)?vimeo.com\/([0-9]{9})/g
  return (
    e.nodeName === 'IMG' &&
    e.parentNode?.nodeName === 'A' &&
    !regex.test(e.parentNode.href)
  )
}

export function isImageWithVideo(e) {
  return e.nodeName === 'IMG' && e.nextSibling?.nodeName === 'VIDEO'
}

export function isVideo(e) {
  return e.nodeName === 'VIDEO' && e.nextSibling?.nodeName !== 'VIDEO'
}

export function isEmbedVideo(e) {
  const regex = /(https?:\/\/)www.(youtube.com\/watch[?]v=([a-zA-Z0-9_-]{11}))|https?:\/\/(www.)?vimeo.com\/([0-9]{9})/g
  return (
    e.nodeName === 'IMG' &&
    e.parentNode?.nodeName === 'A' &&
    regex.test(e.parentNode.href)
  )
}
