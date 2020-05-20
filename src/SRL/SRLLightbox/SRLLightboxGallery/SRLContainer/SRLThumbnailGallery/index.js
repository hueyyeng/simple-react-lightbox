import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  SRLThumbnailGallery,
  SRLThumbnailGalleryImage
} from '../../../../styles/SRLThumbnailsStyle'

const SRLThumbnailGalleryComponent = ({
  elements,
  currentId,
  handleCurrentElement,
  thumbnails,
  SRLThumbnailsRef
}) => {
  const {
    thumbnailsOpacity,
    thumbnailsSize,
    thumbnailsPosition,
    thumbnailsAlignment,
    thumbnailsContainerBackgroundColor,
    thumbnailsContainerPadding,
    thumbnailsGap
  } = thumbnails

  // // Ref for the container of the thumbnails
  // const SRLThumbnailsContainerRef = useRef()

  // Ref for the variables that we will use to determine the mouse move drag effect
  const isDown = useRef(0)
  const startX = useRef(0)
  const startY = useRef(0)
  const scrollLeft = useRef(0)
  const scrollTop = useRef(0)

  /* We need to access the function passed via props inside the useEffect as
  we need some refs (which are undefined outside useEffect). Because the function
  is called on the onClick attribute we need to use a ref */
  const handleCurrentElementRef = useRef()

  useEffect(() => {
    // To make it easier using the ref, we use a short name
    const SRLTCR = SRLThumbnailsRef.current

    // Target the thumbnail
    const target = document.querySelector(`.SRLThumb${currentId}`)

    if (target) {
      // Get the bounding
      const bcr = target.getBoundingClientRect()

      // If we have to to drag the thumbnails we don't want them centered
      if (
        SRLTCR.scrollWidth > SRLTCR.offsetWidth ||
        SRLTCR.scrollHeight > SRLTCR.offsetHeight
      ) {
        SRLTCR.style.justifyContent = 'start'
      } else {
        SRLTCR.style.justifyContent = thumbnailsAlignment || 'center'
      }

      // Scroll the thumbnails automatically and sync the light-box
      if (SRLTCR.scrollWidth > SRLTCR.offsetWidth) {
        if ('scrollBehavior' in document.documentElement.style) {
          SRLTCR.scrollBy({
            top: 0,
            left: bcr.left,
            behavior: 'smooth'
          })
        } else {
          SRLTCR.scrollLeft = bcr.left
        }
      } else if (SRLTCR.scrollHeight > SRLTCR.offsetHeight) {
        if ('scrollBehavior' in document.documentElement.style) {
          SRLTCR.scrollBy({
            top: bcr.top,
            left: 0,
            behavior: 'smooth'
          })
        } else {
          SRLTCR.scrollTop = bcr.top
        }
      }
    }

    /* If we are dragging the thumbnails, we don't want to accidentally click
    on the image immediately after releasing the mouse, so we need a condition
    to determine if we are "clicking" on the same point on the page (pageX OR pageY)
    and that we are not coming from a drag action */
    handleCurrentElementRef.current = function (pageX, pageY, id) {
      if (
        SRLTCR.scrollWidth > SRLTCR.offsetWidth ||
        SRLTCR.scrollHeight > SRLTCR.offsetHeight
      ) {
        if (pageX === startX.current || pageY === startY.current) {
          handleCurrentElement(id, currentId)
        }
      } else {
        handleCurrentElement(id, currentId)
      }
    }

    function handleMouseDownOnThumbnails(pageX, pageY) {
      if (SRLTCR.scrollWidth > SRLTCR.offsetWidth) {
        isDown.current = true
        startX.current = pageX - SRLTCR.offsetLeft
        scrollLeft.current = SRLTCR.scrollLeft
        SRLTCR.classList.add('SRLDraggable')
      } else if (SRLTCR.scrollHeight > SRLTCR.offsetHeight) {
        isDown.current = true
        startY.current = pageY - SRLTCR.offsetTop
        scrollTop.current = SRLTCR.scrollTop
        SRLTCR.classList.add('SRLDraggable')
      }
    }

    function handleMouseLeaveOnThumbnails() {
      isDown.current = false
      SRLTCR.classList.remove('SRLDraggable')
    }

    function handleMouseMoveOnThumbnails(pageX, pageY) {
      if (!isDown.current) return
      if (SRLTCR.scrollHeight > SRLTCR.offsetHeight) {
        const y = pageY - SRLTCR.offsetTop
        const walk = y - startY.current
        SRLTCR.scrollTop = scrollTop.current - walk
      } else {
        const x = pageX - SRLTCR.offsetLeft
        const walk = x - startX.current
        SRLTCR.scrollLeft = scrollLeft.current - walk
      }
    }

    // EVENT LISTENERS
    SRLTCR.addEventListener('mousedown', (e) =>
      handleMouseDownOnThumbnails(e.pageX, e.pageY)
    )
    SRLTCR.addEventListener('mouseleave', () => handleMouseLeaveOnThumbnails())
    SRLTCR.addEventListener('mouseup', () => handleMouseLeaveOnThumbnails())
    SRLTCR.addEventListener('mousemove', (e) =>
      handleMouseMoveOnThumbnails(e.pageX, e.pageY)
    )

    // CLEAN UP
    return () => {
      SRLTCR.removeEventListener('mousedown', (e) =>
        handleMouseDownOnThumbnails(e.pageX)
      )
      SRLTCR.removeEventListener('mouseleave', () =>
        handleMouseLeaveOnThumbnails()
      )
      SRLTCR.removeEventListener('mouseup', () =>
        handleMouseLeaveOnThumbnails()
      )
      SRLTCR.removeEventListener('mousemove', (e) =>
        handleMouseMoveOnThumbnails(e)
      )
    }
  }, [currentId, handleCurrentElement, SRLThumbnailsRef, thumbnailsAlignment])

  return (
    <SRLThumbnailGallery
      ref={SRLThumbnailsRef}
      thumbnailsPosition={thumbnailsPosition}
      thumbnailsSize={thumbnailsSize}
      thumbnailsAlignment={thumbnailsAlignment}
      thumbnailsContainerBackgroundColor={thumbnailsContainerBackgroundColor}
      thumbnailsContainerPadding={thumbnailsContainerPadding}
      className="SRLThumbnailsContainer"
    >
      {elements.map((element) => {
        return (
          <SRLThumbnailGalleryImage
            onClick={(e) =>
              handleCurrentElementRef.current(e.pageX, e.pageY, element.id)
            }
            thumbnailsOpacity={thumbnailsOpacity}
            thumbnailsSize={thumbnailsSize}
            thumbnailsGap={thumbnailsGap}
            key={element.id}
            id={element.id}
            className={`SRLThumb SRLThumb${element.id} ${
              currentId === element.id ? 'SRLThumbnailSelected' : ''
            }`}
            style={{
              backgroundImage: `url('${element.thumbnail}')`
            }}
          />
        )
      })}
    </SRLThumbnailGallery>
  )
}

export default SRLThumbnailGalleryComponent

SRLThumbnailGalleryComponent.propTypes = {
  elements: PropTypes.array,
  handleCurrentElement: PropTypes.func,
  currentId: PropTypes.string,
  SRLThumbnailsRef: PropTypes.object,
  thumbnails: PropTypes.shape({
    thumbnailsAlignment: PropTypes.string,
    thumbnailsContainerBackgroundColor: PropTypes.string,
    thumbnailsContainerPadding: PropTypes.string,
    thumbnailsGap: PropTypes.string,
    thumbnailsOpacity: PropTypes.number,
    thumbnailsPosition: PropTypes.string,
    thumbnailsSize: PropTypes.array
  })
}
