import React from "react";
import Content from "./components/Content";
import ContentPageTwo from "./components/ContentPageTwo";
import GalleryWithLinks from "./components/GalleryWithLinks";
import SimpleReactLightbox from "simple-react-lightbox";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <SimpleReactLightbox>
      <div className="App">
        <Router>
          <Route path="/" exact component={Content} />
          <Route path="/example-two/" component={ContentPageTwo} />
          <Route path="/gallery-with-links/" component={GalleryWithLinks} />
        </Router>
      </div>
    </SimpleReactLightbox>
  );
}

export default App;
