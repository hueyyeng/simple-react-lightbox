import React from "react";
import SRLLogo from "../assets/images/SRL_Logo.png";
import { withSRLContext } from "simple-react-lightbox";
import { Link } from "react-router-dom";
/*
We can use an High Order Component to pass the context and use the methods provided
in case we want to open the lightbox from a button or anything :)
*/

// Pass the props as an argument
const Header = props => {
  return (
    <div id="header">
      <div className="container">
        <div className="row align-items-end">
          <div className="SRL_Logo col-6">
            <img
              src={SRLLogo}
              alt="Simple React Lightbox - A simple but functional light-box for React"
            />
          </div>
          <div className="col-6">
            <nav>
              <ul>
                <li>
                  <Link to="/">Gallery 1</Link>
                </li>
                <li>
                  <Link to="/example-two/">Gallery 2</Link>
                </li>
              </ul>
            </nav>
            <div className="SRL_CTA">
              <button
                className="SRL_CTA-OpenLightbox"
                // Pass the method that you receive with the HOC
                onClick={props.openLightbox}
              >
                Open the lightbox
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap your component using the provided HOC
export default withSRLContext(Header);
