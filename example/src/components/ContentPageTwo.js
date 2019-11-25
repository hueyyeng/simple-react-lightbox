import React from 'react'
import Layout from './Layout'

// This examples uses external images
import { SRLWrapper } from 'simple-react-lightbox'

const ContentPageTwo = () => {
  return (
    <Layout>
      <SRLWrapper>
        <div id="content-page-two" className="container content">
          <div className="row">
            <div className="col-md-6 col-12 col-image">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash10.jpg"
                alt="Above"
              />
            </div>
            <div className="col-md-6 col-12 col-text">
              <h1>
                Page 2 - <br />
                Lorem ipsum
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Scripta periculis ei eam, te pro movet
                reformidans. Offendit eleifend moderatius ex vix, quem odio
                mazim et qui, purto expetendis cotidieque quo cu, veri persius
                vituperata ei nec. Scripta periculis ei eam, te pro movet
                reformidans. Quot populo ad qui. Offendit eleifend moderatius ex
                vix, quem odio mazim et qui, purto expetendis cotidieque quo cu,
                veri persius vituperata ei nec.
              </p>
            </div>
            <div className="col-md-6 col-12 col-text">
              <h2>The image on the right is broken!!!</h2>
              <p>
                A broken image won't trigger the light-box and it won't be shown
                in the thumnails as well. It will be completely ignored. <br />
                Try clicking on the image.
              </p>
            </div>
            <div className="col-md-6 col-12 col-image">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/broken.jpg"
                alt="A broken link"
              />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash11.jpg"
                alt="Coast in the evening"
              />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash12.jpg"
                alt="Clouds & Sea"
              />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash13.jpg"
                alt="Green"
              />
            </div>
            <div className="col-12">
              <h2>Lorem ipsum dolor sit amet</h2>
              <p>
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Offendit
                eleifend moderatius ex vix, quem odio mazim et qui, purto
                expetendis cotidieque quo cu, veri persius vituperata ei nec.
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. An dicant apeirian qui,
                at vide indoctum pro. Offendit eleifend moderatius ex vix, quem
                odio mazim et qui, purto expetendis cotidieque quo cu, veri
                persius vituperata ei nec. Offendit eleifend moderatius ex vix,
                quem odio mazim et qui, purto expetendis cotidieque quo cu, veri
                persius vituperata ei nec.
              </p>
            </div>
            <div className="col-md-6 col-12 col-image">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash14.jpg"
                alt="Above"
              />
            </div>
            <div className="col-md-6 col-12 col-text">
              <h1>Consectetur adipiscing elit</h1>
              <a
                href="http://www.google.co.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consectetur adipiscing elit
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Scripta periculis ei eam, te pro movet
                reformidans. Offendit eleifend moderatius ex vix, quem odio
                mazim et qui, purto expetendis cotidieque quo cu, veri persius
                vituperata ei nec. Scripta periculis ei eam, te pro movet
                reformidans.
              </p>
            </div>
            <div className="col-12 col-md-6 col-image-half">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash15.jpg"
                alt="Pattern"
              />
            </div>
            <div className="col-12 col-md-6 col-image-half">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash16.jpg"
                alt="Countryside"
              />
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  )
}

export default ContentPageTwo
