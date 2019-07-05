import React from "react";
import Content from "./components/Content";
import ContentTwo from "./components/Content_two";
import SimpleReactLightbox from "simple-react-lightbox";
import { BrowserRouter as Router, Route } from "react-router-dom";

const options = {
  overlayColor: "white",
  captionStyle: {
    captionColor: "rgba(53, 129, 184, 1)",
    captionFontFamily: "Raleway, sans-serif",
    captionFontSize: "22px",
    captionFontWeight: "300",
    captionFontStyle: "uppercase"
  },
  buttonsStyle: {
    buttonsBackgroundColor: "rgba(53, 129, 184, 1)",
    buttonsIconColor: "rgba(205, 221, 221, 0.6)"
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
          <Route path="/example-two/" component={ContentTwo} />
        </Router>
      </div>
    </SimpleReactLightbox>
  );
}

export default App;
