import React, { Component } from "react";
import Heder from "./components/Header";
import Content from "./components/Content";

import SimpleReactLightbox from "simple-react-lightbox";

class App extends Component {
  render() {
    return (
      <div>
        <SimpleReactLightbox
          showThumbnails={true}
          showCaption={true}
          overlayColor="rgba(255,255,255,0.6)"
          captionColor="rgba(0,0,0,0)"
          buttonsIconColor="rgba(255,255,255, 0.6)"
        >
          <Heder />
          <hr />
          <Content />
        </SimpleReactLightbox>
      </div>
    );
  }
}

export default App;
