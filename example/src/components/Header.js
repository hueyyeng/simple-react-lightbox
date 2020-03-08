import React from 'react'
import SRLLogo from '../assets/images/SRL_Logo.png'
import Button from './Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div className="SRL_Logo col-12">
            <img
              src={SRLLogo}
              alt="Simple React Lightbox - A simple but functional light-box for React"
            />
          </div>
          <div className="col-md-8 col-12">
            <nav>
              <ul>
                <li>
                  <Link to="/">Gallery</Link>
                </li>
                <li>
                  <Link to="/with-text/">Gallery and text</Link>
                </li>
                <li>
                  <Link to="/with-thumbs/">Gallery with thumbs</Link>
                </li>
                <li>
                  <Link to="/with-hook/">With Hook</Link>
                </li>
                <li>
                  <Link to="/with-callbacks/">With Callbacks</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-4 col-12 align-self-center">
            {/* Check the Button component to see how it implements the High Order Component */}
            <Button />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
