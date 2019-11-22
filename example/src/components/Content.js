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
// import bunnyMp4 from '../assets/images/gallery/video/big_buck_bunny.mp4'
// import bunnyOgv from '../assets/images/gallery/video/big_buck_bunny.ogv'
// import robotMp4 from '../assets/images/gallery/video/robot.mp4'
// import robotOgv from '../assets/images/gallery/video/robot.ogv'

const options = {
  overlayColor: 'rgb(25, 136, 124)',
  transitionTimingFunction: 'ease',
  slideTransitionSpeed: 1000
}

const Content = () => {
  return (
    <Layout>
      <SRLWrapper options={options}>
        <div id="content-page-one" className="container content">
          <div className="row">
            <div className="col-md-6 col-12 col-text">
              <h1>Lorem ipsum dolor sit amet</h1>
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
            <div className="col-md-6 col-12 col-image">
              <img
                src="http://fodfodsfds.jpg"
                alt="New York City - Architecture"
              />
            </div>
            {/* <div className="col-6">
              <video width="100%" height="auto" controls>
                <source src={bunnyMp4} type="video/mp4" />
                <source src={bunnyOgv} type="video/ogg" />
                Video 1
              </video>
            </div>
            <div className="col-6">
              <video width="100%" height="auto" controls>
                <source src={robotMp4} type="video/mp4" />
                <source src={robotOgv} type="video/ogg" />
                Video 2
              </video>
            </div> */}
            <div className="col-md-4 col-12 col-image-small">
              <img src={img02} alt="Between two mountains" />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img src={img03} alt="Parallels building" />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img src={img04} alt="The mist in the forest" />
            </div>
            <div className="col-md-6 col-12 col-image">
              <img src={img05} alt="A beautiful landscape" />
            </div>
            <div className="col-md-6 col-12 col-text">
              <h1>Consectetur adipiscing elit</h1>
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
            <div className="col-12 col-md-6 col-image-half">
              <img src={img06} alt="Night in new york" />
            </div>
            <div className="col-12 col-md-6 col-image-half">
              <img src={img07} alt="Be proud!!!" />
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
            <div className="col-12 col-image-large">
              <img src={img08} alt="Sunset road..." />
            </div>
            <div className="col-12 col-image-large">
              <img src={img09} alt="A stunning lake." />
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  )
}

export default Content
