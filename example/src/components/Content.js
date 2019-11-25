import React from 'react'
import Layout from './Layout'
import { SRLWrapper } from 'simple-react-lightbox'
import img01 from '../assets/images/gallery/unsplash01.jpg'
import img02 from '../assets/images/gallery/unsplash02.jpg'
import img03 from '../assets/images/gallery/unsplash03.jpg'
import img04 from '../assets/images/gallery/unsplash04.jpg'
import img05 from '../assets/images/gallery/unsplash05.jpg'
import img06 from '../assets/images/gallery/unsplash06.jpg'
import img07 from '../assets/images/gallery/unsplash07.jpg'
import img08 from '../assets/images/gallery/unsplash08.jpg'
import img09 from '../assets/images/gallery/unsplash09.jpg'

const options = {
  overlayColor: 'rgb(25, 136, 124)',
  transitionTimingFunction: 'ease',
  slideTransitionSpeed: 1000,
  buttonsIconPadding: '2px',
  buttonsIconColor: 'rgba(25, 136, 124, 0.5)',
  enablePanzoom: false,
  hideControlsAfter: 0
}

const Content = () => {
  return (
    <Layout>
      <SRLWrapper options={options}>
        <div id="content-page-one" className="container content">
          <div className="row">
            <div className="col-md-6 col-12 col-image-half">
              <img src={img01} alt="New York City - Architecture" />
            </div>
            <div className="col-md-6 col-12 col-image-half">
              <img src={img02} alt="Between two mountains" />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img src={img03} alt="Parallels building" />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img src={img04} alt="The mist in the forest" />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img src={img05} alt="A beautiful landscape" />
            </div>
            <div className="col-12 col-md-6 col-image-half">
              <img src={img06} alt="Night in new york" />
            </div>
            <div className="col-12 col-md-6 col-image-half">
              <img src={img07} alt="Be proud!!!" />
            </div>
            <div className="col-6 col-image-large-half">
              <img src={img08} alt="Sunset road..." />
            </div>
            <div className="col-6 col-image-large-half">
              <img src={img09} alt="A stunning lake." />
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  )
}

export default Content
