import React from "react";
import Content from "./components/Content";
import ContentPageTwo from "./components/ContentPageTwo";
import GalleryWithLinks from "./components/GalleryWithLinks";
import SimpleReactLightbox from "simple-react-lightbox";
import { BrowserRouter as Router, Route } from "react-router-dom";

const options = {
  overlayColor: "rgb(25, 136, 124)",
  captionStyle: {
    captionColor: "#a6cfa5",
    captionFontFamily: "Raleway, sans-serif",
    captionFontSize: "22px",
    captionFontWeight: "300",
    captionFontStyle: "capitalize"
  },
  buttonsStyle: {
    buttonsBackgroundColor: "#1b5245",
    buttonsIconColor: "rgba(126, 172, 139, 0.8)"
  },
  autoplaySpeed: 1500,
  transitionSpeed: 900,
  showCaption: true,
  showThumbnails: true
};

function App() {
  return (
    <SimpleReactLightbox {...options}>
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
