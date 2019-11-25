import React from 'react'
import Layout from './Layout'
import { SRLWrapper } from 'simple-react-lightbox'

const options = {
  overlayColor: 'rgb(200, 200, 200)',
  showCaption: false,
  buttonsBackgroundColor: 'rgba(140, 94, 88, 0.8)',
  buttonsIconColor: 'rgba(219, 219, 219, 0.7)',
  showThumbnails: false,
  transitionSpeed: 1000,
  transitionTimingFunction: 'linear'
}

function GalleryWithLinks() {
  return (
    <Layout>
      <SRLWrapper options={options}>
        <div id="gallery-with-links" className="container content">
          <div className="row">
            <div className="col-md-4 col-6 col-image-with-link">
              <a
                href="https://www.simple-react-lightbox.dev/images/gallery/unsplash17.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/images/gallery/thumbnails/unsplash17_thumb.jpg"
                  alt="A small boat"
                />
              </a>
            </div>
            <div className="col-md-4 col-6 col-image-with-link">
              <a
                href="https://www.simple-react-lightbox.dev/images/gallery/unsplash18.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/images/gallery/thumbnails/unsplash18_thumb.jpg"
                  alt="Umbrella"
                />
              </a>
            </div>
            <div className="col-md-4 col-6 col-image-with-link">
              <a
                href="https://www.simple-react-lightbox.dev/images/gallery/unsplash19.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/images/gallery/thumbnails/unsplash19_thumb.jpg"
                  alt="Penguins kissed by the sun"
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.simple-react-lightbox.dev/images/gallery/unsplash20.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/images/gallery/thumbnails/unsplash20_thumb.jpg"
                  alt="A peaceful lake."
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.simple-react-lightbox.dev/images/gallery/unsplash21.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/images/gallery/thumbnails/unsplash21_thumb.jpg"
                  alt="Small insect"
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.simple-react-lightbox.dev/images/gallery/unsplash22.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/images/gallery/thumbnails/unsplash22_thumb.jpg"
                  alt="Desert lizard"
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.simple-react-lightbox.dev/images/gallery/unsplash23.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/images/gallery/thumbnails/unsplash23_thumb.jpg"
                  alt="When in Rome..."
                />
              </a>
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  )
}

export default GalleryWithLinks
