import React from "react";
import { SRLImages } from "simple-react-lightbox";
import img01 from "../images/800x800.jpg";
import img02 from "../images/1000x600.jpg";
import img03 from "../images/1024x768.jpg";
import img04 from "../images/1920x1024.jpg";
import img05 from "../images/2000x1900.jpg";
import img06 from "../images/4000x1980.jpg";
import img07 from "../images/4000x1980_2.jpg";
const Content = () => {
  return (
    <SRLImages>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, illo
        cum nobis laborum, ullam dolorem iure odit id placeat in est, aliquam
        asperiores dolor ipsum ab! Dolores aspernatur odit totam quis alias
        voluptate ex non illo itaque, magnam iure distinctio. Ullam, quia
        quisquam! Illum, praesentium, ipsum asperiores beatae et laudantium
        eligendi rem officiis natus laborum dignissimos id repellat accusamus
        inventore tempora blanditiis facilis. Hic unde nostrum qui, a numquam
        voluptatum officiis commodi voluptate accusantium similique sequi quidem
        adipisci reprehenderit quisquam eveniet earum doloremque, autem illum
        dolore? Deserunt, sit corporis repellendus quasi fugit voluptatem
        mollitia exercitationem ipsa ipsam earum inventore odit.
      </p>
      <img src={img01} alt="Lorem ipsum, dolor sit amet" />
      <img src={img02} alt="Consectetur adipisicing elit" />
      <img src={img03} alt="Nulla, illo cum nobis laborum" />
      <p>
        <img src={img04} alt="Dolores aspernatur odit totam" />
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aperiam
        iusto ea beatae perspiciatis fugit soluta nihil facilis inventore culpa.
      </p>
      <span>
        <img src={img05} alt="Magnam iure distinctio" />
      </span>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aperiam
        iusto ea beatae perspiciatis fugit soluta nihil facilis inventore culpa.
      </p>
      <div>
        <img src={img06} alt="Hic unde nostrum qui" />
        <img src={img07} alt="Deserunt, sit corporis repellendus quasi fugit" />
      </div>
    </SRLImages>
  );
};

export default Content;
