import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import SimpleReactLightbox from "simple-react-lightbox";

const options = {
  overlayColor: "white",
  captionColor: "black",
  buttonsBackgroundColor: "rgba(53, 129, 184, 1)",
  buttonsIconColor: "rgba(205, 221, 221, 0.6)",
  autoplaySpeed: 1500,
  transitionSpeed: 900,
  showCaption: true,
  showThumbnails: true
};

function App() {
  return (
    <SimpleReactLightbox {...options}>
      <div className="App">
        <Header />
        <Content />
      </div>
    </SimpleReactLightbox>
  );
}

export default App;
