import React from "react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import SimpleReactLightbox from "simple-react-lightbox";

function App() {
  return (
    <SimpleReactLightbox>
      <div className="App">
        <Header />
        <Gallery />
      </div>
    </SimpleReactLightbox>
  );
}

export default App;
