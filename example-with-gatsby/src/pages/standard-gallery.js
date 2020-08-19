import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import Layout from '../components/layout'

const options = {
  buttons: {
    backgroundColor: 'rgba(140, 94, 88, 0.8)',
    iconColor: 'rgba(241, 191, 152, 0.7)'
  },
  settings: {
    overlayColor: 'rgba(255, 237, 225, 1)',
    showThumbnails: false,
    transitionSpeed: 1000,
    transitionTimingFunction: 'linear'
  },
  thumbnails: {
    thumbnailsSize: ['120px', '150px'],
    thumbnailsPosition: 'left',
    thumbnailsGap: '0 0 10px 0',
    thumbnailsOpacity: 0.2,
    thumbnailsContainerBackgroundColor: '#AF9AB2',
    thumbnailsContainerPadding: '0 5px'
  },
  progressBar: {
    size: '4px',
    backgroundColor: 'rgba(255, 237, 225, 1)',
    fillColor: '#AF9AB2'
  }
}

function GalleryWithThumbs() {
  return (
    <Layout>
      <SRLWrapper options={options}>
        <Container id="gallery-with-links" className="container content">
          <Row>
            <Col lg="6">
              <a
                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash17.jpg"
                data-attribute="SRL"
                className="pseudo-element"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash17.jpg"
                  alt="A small boat"
                />
              </a>
            </Col>
            <Col lg="6">
              <a
                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg"
                data-attribute="SRL"
                className="pseudo-element"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash19.jpg"
                  alt="Penguins kissed by the sun"
                />
              </a>
            </Col>
            <Col lg="6">
              <a
                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash04.jpg"
                data-attribute="SRL"
                className="pseudo-element"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash04.jpg"
                  alt="Penguins kissed by the sun"
                />
              </a>
            </Col>
            <Col lg="6">
              <a
                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash05.jpg"
                data-attribute="SRL"
                className="pseudo-element"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash05.jpg"
                  alt="A peaceful lake."
                />
              </a>
            </Col>
            <Col lg="6">
              <a
                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash20.jpg"
                data-attribute="SRL"
                className="pseudo-element"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash20.jpg"
                  alt="A peaceful lake."
                />
              </a>
            </Col>
            <Col lg="6">
              <a
                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash21.jpg"
                data-attribute="SRL"
                className="pseudo-element"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash21.jpg"
                  alt="Small insect"
                />
              </a>
            </Col>
            <Col lg="6">
              <a
                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash22.jpg"
                data-attribute="SRL"
                className="pseudo-element"
              >
                <img
                  src="https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash22.jpg"
                  alt="Desert lizard"
                />
              </a>
            </Col>
          </Row>
        </Container>
      </SRLWrapper>
    </Layout>
  )
}

export default GalleryWithThumbs
