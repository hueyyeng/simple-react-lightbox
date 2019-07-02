import React from "react";
import SRLLogo from "../assets/images/SRL_Logo.png";

const Header = () => {
  return (
    <div id="header">
      <div className="container">
        <div className="section">
          <div className="SRL_Logo">
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
