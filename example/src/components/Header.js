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
          <div className="SRL_Logo col-md-6 col-12">
            <img
              src={SRLLogo}
              alt="Simple React Lightbox - A simple but functional light-box for React"
            />
          </div>
          <div className="col-md-6 col-12">
            <nav>
              <ul>
                <li>
                  <Link to="/">Mixed content</Link>
                </li>
                <li>
                  <Link to="/example-two/">Mixed content - Page 2</Link>
                </li>
                <li>
                  <Link to="/gallery-with-links/">Gallery with links</Link>
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
