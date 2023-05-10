import { IElement } from '../../types'

export function isSimpleImage(e: HTMLImageElement) {
  return e.nodeName === 'IMG' && e.parentNode?.nodeName !== 'A'
}

export function isGalleryImage(e: HTMLImageElement) {
  return (
    e.getAttribute('srl_gallery_image') ||
    (e.nodeName === 'IMG' &&
      (e.offsetParent?.nodeName === 'A' || e.parentNode?.nodeName === 'A')) ||
    (e.nodeName === 'IMG' &&
      e.parentNode?.nodeName === 'PICTURE' &&
      e.offsetParent?.nodeName === 'A') ||
    e.parentNode?.nodeName === 'A'
  )
}

export function isGatsbyGalleryImage(e: HTMLImageElement) {
  return (
    e.nodeName === 'IMG' &&
    e.parentNode?.nodeName === 'PICTURE' &&
    e.parentNode?.parentElement?.className.includes('gatsby-image-wrapper') &&
    e.parentNode?.parentNode?.parentNode?.nodeName === 'A'
  )
}

export function isImageByUser(e: IElement) {
  // const regex = /\.(jpeg|jpg|gif|svg|png|webp)\/?$/g
  // return regex.test(e.src)
  return e.src
}
