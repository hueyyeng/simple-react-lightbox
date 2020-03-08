import React, { useState } from 'react'
import Layout from './Layout'
import { SRLWrapper } from 'simple-react-lightbox'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { snippets } from '../snippets'
import Button from './Button'
import img01 from '../assets/images/gallery/unsplash01.jpg'
import img02 from '../assets/images/gallery/unsplash02.jpg'
import img03 from '../assets/images/gallery/unsplash03.jpg'
import img04 from '../assets/images/gallery/unsplash04.jpg'
import img05 from '../assets/images/gallery/unsplash05.jpg'
import img06 from '../assets/images/gallery/unsplash06.jpg'
import img07 from '../assets/images/gallery/unsplash07.jpg'
import img08 from '../assets/images/gallery/unsplash08.jpg'
import img09 from '../assets/images/gallery/unsplash09.jpg'

const Content = () => {
  const [value, setValue] = useState(3)

  const callbacks = {
    onSlideChange: slide => setValue(slide.index)
  }

  function handleInput(e) {
    setValue(e.target.value)
  }

  return (
    <Layout>
      <div className="instructions">
        <div className="container content">
          <div className="row">
            <div className=" col-md-4 col-12">
              <div className="instruction">
                <p>
                  The buttons on this website are a separated component and are
                  using a <strong>custom hook</strong> that handle the function
                  to open the light-box.
                </p>
                <p>
                  The button next to the navigation simply open the light-box
                  and the button below opens the light-box selecting a specific
                  image instead by passing an index (
                  <strong>starting from 0</strong>). So by passing 3 for example
                  the 4th image will be opened. If you pass a value that is not
                  valid, the first image will be opened.
                </p>
                <input
                  type="number"
                  value={value}
                  min="0"
                  max="9"
                  onChange={handleInput}
                />
                <Button imageToOpen={value} light />
                <a
                  href="https://github.com/michelecocuccio/simple-react-lightbox#with-custom-hook"
                  target="__blank"
                >
                  Documentation on how to use
                </a>
              </div>
            </div>
            <div className=" col-md-8 col-12">
              <SyntaxHighlighter language="jsx" style={darcula}>
                {snippets.withHook}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
      <SRLWrapper callbacks={callbacks}>
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
              <img src={img09} alt="A stunning lake" />
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  )
}

export default Content
