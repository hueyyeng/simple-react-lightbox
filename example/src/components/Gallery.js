import React from "react";

import img01 from "../assets/images/gallery/unsplash01.jpg";
import img02 from "../assets/images/gallery/unsplash02.jpg";
import img03 from "../assets/images/gallery/unsplash03.jpg";
import img04 from "../assets/images/gallery/unsplash04.jpg";
import img05 from "../assets/images/gallery/unsplash05.jpg";
import img06 from "../assets/images/gallery/unsplash06.jpg";
import img07 from "../assets/images/gallery/unsplash07.jpg";
import img08 from "../assets/images/gallery/unsplash08.jpg";
import img09 from "../assets/images/gallery/unsplash09.jpg";

import { SRLImages } from "simple-react-lightbox";

const Gallery = () => {
  return (
    <SRLImages>
      <div id="gallery">
        <div className="container">
          <div className="section">
            <img src={img01} alt="New York City - Architecture" />
            <img src={img02} alt="Between Two Mountains" />
            <img src={img03} alt="Parallel Buildings" />
            <img src={img04} alt="The forst and the fog..." />
            <img src={img05} alt="A small creek between the rocks" />
            <img src={img06} alt="The city and the vibrant colours" />
            <img src={img07} alt="BE PROUD!" />
            <img src={img08} alt="A beautiful landscape" />
            <img
              src={img09}
              alt="It's so beautiful it makes me want to jump in"
            />
          </div>
        </div>
      </div>
    </SRLImages>
  );
};

export default Gallery;

// Photo by Lerone Pieters on Unsplash
// Photo by Lerone Pieters on Unsplash
