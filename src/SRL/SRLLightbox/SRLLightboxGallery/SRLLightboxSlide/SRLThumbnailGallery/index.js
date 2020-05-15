import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { SRLThumbnailGallery, SRLThumbnailGalleryImage } from '../../styles'

const SRLThumbnailGalleryComponent = ({
  elements,
  currentId,
  handleCurrentElement,
  thumbnailsOpacity,
  thumbnailsSize
}) => {
  // Ref for the container of the thumbnails
  const SRLThumbnailsContainerRef = useRef()

  // Ref for the variables that we will use to determine the mouse move drag effect
  const isDown = useRef(0)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  /* We need to access the function passed via props inside the useEffect as
  we need some refs (which are undefined outside useEffect). Because the function
  is called on the onClick attribute we need to use a ref */
  const handleCurrentElementRef = useRef()

  useEffect(() => {
    // To make it easier using the ref, we use a short name
    const SRLTCR = SRLThumbnailsContainerRef.current

    // If we have to to drag the thumbnails we don't want them centered
    if (SRLTCR.scrollWidth > SRLTCR.offsetWidth) {
      SRLTCR.style.justifyContent = 'start'
    } else {
      SRLTCR.style.justifyContent = 'center'
    }

    // Scroll the thumbnails automatically and sync the light-box
    if (SRLTCR.scrollWidth > SRLTCR.offsetWidth) {
      const target = document.querySelectorAll(`.SRLThumb${currentId}`)[0]
      const bcr = target.getBoundingClientRect()
      SRLTCR.scrollBy({
        top: 0,
        left: bcr.left,
        behavior: 'smooth'
      })
    }

    /* If we are dragging the thumbnails, we don't want to accidentally click
    on the image immediately after releasing the mouse, so we need a condition
    to determine if we are "clicking" on the same point on the page (pageX)
    and that we are not coming from a drag action */
    handleCurrentElementRef.current = function (pageX, id) {
      if (SRLTCR.scrollWidth > SRLTCR.offsetWidth) {
        if (pageX === startX.current) {
          handleCurrentElement(id, currentId)
        }
      } else {
        handleCurrentElement(id, currentId)
      }
    }

    function handleMouseDownOnThumbnails(pageX) {
      if (SRLTCR.scrollWidth > SRLTCR.offsetWidth) {
        isDown.current = true
        startX.current = pageX - SRLTCR.offsetLeft
        scrollLeft.current = SRLTCR.scrollLeft
        SRLTCR.classList.add('SRLDraggable')
      }
    }

    function handleMouseLeaveOnThumbnails() {
      isDown.current = false
      SRLTCR.classList.remove('SRLDraggable')
    }

    function handleMouseMoveOnThumbnails(e) {
      if (!isDown.current) return
      e.preventDefault()
      const x = e.pageX - SRLTCR.offsetLeft
      const walk = x - startX.current
      SRLTCR.scrollLeft = scrollLeft.current - walk
    }

    // EVENT LISTENERS
    SRLTCR.addEventListener('mousedown', (e) =>
      handleMouseDownOnThumbnails(e.pageX)
    )
    SRLTCR.addEventListener('mouseleave', () => handleMouseLeaveOnThumbnails())
    SRLTCR.addEventListener('mouseup', () => handleMouseLeaveOnThumbnails())
    SRLTCR.addEventListener('mousemove', (e) => handleMouseMoveOnThumbnails(e))

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
  }, [
    SRLThumbnailsContainerRef,
    currentId,
    thumbnailsSize,
    handleCurrentElement,
    elements
  ])

  return (
    <SRLThumbnailGallery
      ref={SRLThumbnailsContainerRef}
      className="SRLThumbnailsContainer"
    >
      {elements.map((element, index) => {
        return (
          <SRLThumbnailGalleryImage
            onClick={(e) =>
              handleCurrentElementRef.current(e.pageX, element.id)
            }
            thumbnailsOpacity={thumbnailsOpacity}
            thumbnailsSize={thumbnailsSize}
            key={element.id}
            id={element.id}
            className={`SRLThumb SRLThumb${index} ${
              currentId === element.id ? 'SRLSelected' : ''
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
  thumbnailsOpacity: PropTypes.number,
  thumbnailsSize: PropTypes.array
}
