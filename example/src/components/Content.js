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
import videomp4 from '../assets/images/gallery/small.mp4'
import videogg from '../assets/images/gallery/small.ogv'

const options = {
  overlayColor: 'rgb(25, 136, 124)',
  transitionSpeed: 300,
  transitionTimingFunction: 'ease',
  buttonsSize: '50px',
  buttonsIconPadding: '1px',
  buttonsBackgroundColor: 'red'
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
              <img src={img01} alt="New York City - Architecture" />
            </div>
            <div className="col-12">
              <video width="320" height="240" controls>
                <source src={videomp4} type="video/mp4" />
                <source src={videogg} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div>
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
