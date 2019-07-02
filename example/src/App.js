import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import SimpleReactLightbox from "simple-react-lightbox";

function App() {
  return (
    <SimpleReactLightbox>
      <div className="App">
        <Header />
        <Content />
      </div>
    </SimpleReactLightbox>
  );
}

export default App;
