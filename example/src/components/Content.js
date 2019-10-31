import React from "react";
import Layout from "./Layout";
import { SRLWrapper } from "simple-react-lightbox";

const Content = () => {
  return (
    <Layout>
      <SRLWrapper>
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
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash01.jpg"
                alt="New York City - Architecture"
              />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash02.jpg"
                alt="Between two mountains"
              />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash03.jpg"
                alt="Parallels building"
              />
            </div>
            <div className="col-md-4 col-12 col-image-small">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash04.jpg"
                alt="The mist in the forest"
              />
            </div>
            <div className="col-md-6 col-12 col-image">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash05.jpg"
                alt="A beautiful landscape"
              />
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
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash06.jpg"
                alt="Night in new york"
              />
            </div>
            <div className="col-12 col-md-6 col-image-half">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash07.jpg"
                alt="Be proud!!!"
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
            <div className="col-12 col-image-large">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash08.jpg"
                alt="Sunset road..."
              />
            </div>
            <div className="col-12 col-image-large">
              <img
                src="https://www.simple-react-lightbox.dev/images/gallery/unsplash09.jpg"
                alt="A stunning lake."
              />
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  );
};

export default Content;
