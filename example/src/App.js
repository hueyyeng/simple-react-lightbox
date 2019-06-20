import React, { Component } from "react";
import Heder from "./components/Header";
import Content from "./components/Content";

import SimpleReactLightbox from "simple-react-lightbox";

class App extends Component {
  render() {
    return (
      <div>
        <SimpleReactLightbox showThumbnails={true} showCaption={true}>
          <Heder />
          <hr />
          <Content />
        </SimpleReactLightbox>
      </div>
    );
  }
}

export default App;
