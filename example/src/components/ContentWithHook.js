import React, { useRef, useEffect } from 'react'
import Layout from './Layout'
import Slider from 'react-slick'

// This examples uses external images
import { SRLWrapper } from 'simple-react-lightbox'
import { useLightbox } from 'simple-react-lightbox'

const ContentWithHook = () => {
  const openLightbox = useLightbox()
  const sliderRef = useRef()

  const settings = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const options = {
    overlayColor: 'rgb(25, 136, 124)',
    transitionTimingFunction: 'ease',
    slideTransitionSpeed: 1000,
    buttonsIconPadding: '2px',
    buttonsIconColor: 'rgba(25, 136, 124, 0.5)',
    enablePanzoom: false,
    hideControlsAfter: 0
  }

  function syncSlide(x) {
    console.log('goTo', x)
    sliderRef.current.slickGoTo(x)
  }

  const callbacks = {
    onCountSlides: x => console.log('total slides', x),
    onSlideChange: infos => console.log(infos),
    onLightboxClosed: () => console.log('lightbox is closed'),
    onLightboxOpened: () => console.log('lightbox is opened')
  }

  return (
    <Layout>
      <SRLWrapper options={options} callbacks={callbacks}>
        <Slider ref={sliderRef} {...settings}>
          <div>
            <img
              src="https://www.simple-react-lightbox.dev/images/gallery/unsplash11.jpg"
              alt="Coast in the evening"
            />
          </div>
          <div>
            <img
              src="https://www.simple-react-lightbox.dev/images/gallery/unsplash12.jpg"
              alt="Coast in the evening"
            />
          </div>
          <div>
            <img
              src="https://www.simple-react-lightbox.dev/images/gallery/unsplash13.jpg"
              alt="Coast in the evening"
            />
          </div>
          <div>
            <img
              src="https://www.simple-react-lightbox.dev/images/gallery/unsplash14.jpg"
              alt="Coast in the evening"
            />
          </div>
          <div>
            <img
              src="https://www.simple-react-lightbox.dev/images/gallery/unsplash15.jpg"
              alt="Coast in the evening"
            />
          </div>
          <div>
            <img
              src="https://www.simple-react-lightbox.dev/images/gallery/unsplash16.jpg"
              alt="Coast in the evening"
            />
          </div>
        </Slider>
      </SRLWrapper>
    </Layout>
  )
}

export default ContentWithHook
