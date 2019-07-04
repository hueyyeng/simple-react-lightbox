import React from "react";
import Layout from "./Layout";

import img01 from "../assets/images/gallery/unsplash01.jpg";
import img02 from "../assets/images/gallery/unsplash02.jpg";
import img03 from "../assets/images/gallery/unsplash03.jpg";
import img04 from "../assets/images/gallery/unsplash04.jpg";
import img05 from "../assets/images/gallery/unsplash05.jpg";
import img06 from "../assets/images/gallery/unsplash06.jpg";
import img07 from "../assets/images/gallery/unsplash07.jpg";
import img08 from "../assets/images/gallery/unsplash08.jpg";
import img09 from "../assets/images/gallery/unsplash09.jpg";

import { SRLWrapper } from "simple-react-lightbox";

const Content = () => {
  return (
    <Layout>
      <SRLWrapper>
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12 col-text">
                <h1>
                  Page 2 - <br />
                  Lorem ipsum
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Scripta periculis ei eam, te
                  pro movet reformidans. Offendit eleifend moderatius ex vix,
                  quem odio mazim et qui, purto expetendis cotidieque quo cu,
                  veri persius vituperata ei nec. Scripta periculis ei eam, te
                  pro movet reformidans. Quot populo ad qui. Offendit eleifend
                  moderatius ex vix, quem odio mazim et qui, purto expetendis
                  cotidieque quo cu, veri persius vituperata ei nec.
                </p>
              </div>
              <div className="col-md-6 col-12 col-image">
                <img src={img08} alt="A beautiful landscape" />
              </div>
              <div className="col-md-4 col-12 col-image-small">
                <img src={img07} alt="BE PROUD!" />
              </div>
              <div className="col-md-4 col-12 col-image-small">
                <img
                  src={img09}
                  alt="It's so beautiful it makes me want to jump in"
                />
              </div>
              <div className="col-md-4 col-12 col-image-small">
                <img src={img04} alt="The forst and the fog..." />
              </div>
              <div className="col-md-6 col-12 col-image">
                <img src={img05} alt="New York City - Architecture" />
              </div>
              <div className="col-md-6 col-12 col-text">
                <h1>Consectetur adipiscing elit</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Scripta periculis ei eam, te
                  pro movet reformidans. Offendit eleifend moderatius ex vix,
                  quem odio mazim et qui, purto expetendis cotidieque quo cu,
                  veri persius vituperata ei nec. Scripta periculis ei eam, te
                  pro movet reformidans. Quot populo ad qui. Offendit eleifend
                  moderatius ex vix, quem odio mazim et qui, purto expetendis
                  cotidieque quo cu, veri persius vituperata ei nec.
                </p>
              </div>
              <div className="col-12 col-md-6 col-image-half">
                <img src={img02} alt="Between Two Mountains" />
              </div>
              <div className="col-12 col-md-6 col-image-half">
                <img src={img01} alt="New York City - Architecture" />
              </div>
              <div className="col-12">
                <h2>Lorem ipsum dolor sit amet</h2>
                <p>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                  Offendit eleifend moderatius ex vix, quem odio mazim et qui,
                  purto expetendis cotidieque quo cu, veri persius vituperata ei
                  nec. Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur. An dicant
                  apeirian qui, at vide indoctum pro. Offendit eleifend
                  moderatius ex vix, quem odio mazim et qui, purto expetendis
                  cotidieque quo cu, veri persius vituperata ei nec. Offendit
                  eleifend moderatius ex vix, quem odio mazim et qui, purto
                  expetendis cotidieque quo cu, veri persius vituperata ei nec.
                </p>
              </div>
              <div className="col-12 col-image-large">
                <img src={img06} alt="Beautiful landscape...speachless..." />
              </div>
              <div className="col-12 col-image-large">
                <img src={img03} alt="Parallel Buildings" />
              </div>
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  );
};

export default Content;
