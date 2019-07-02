import React from "react";
import SRLLogo from "../assets/images/SRL_Logo.png";

const Header = () => {
  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div className="SRL_Logo col-md-12 col-12">
            <img
              src={SRLLogo}
              alt="Simple React Lightbox - A simple but functional light-box for React"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
