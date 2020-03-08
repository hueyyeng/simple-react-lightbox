import React from 'react'
import Gallery from './components/Gallery'
import GalleryWithText from './components/GalleryWithText'
import GalleryWithThumbs from './components/GalleryWithThumbs'
import GalleryWithHook from './components/GalleryWithHook'
import GalleryWithCallbacks from './components/GalleryWithCallbacks'
import SimpleReactLightbox from 'simple-react-lightbox'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <SimpleReactLightbox>
      <div className="App">
        <Router>
          <Route path="/" exact component={Gallery} />
          <Route path="/with-text/" component={GalleryWithText} />
          <Route path="/with-thumbs/" component={GalleryWithThumbs} />
          <Route path="/with-hook/" component={GalleryWithHook} />
          <Route path="/with-callbacks/" component={GalleryWithCallbacks} />
        </Router>
      </div>
    </SimpleReactLightbox>
  )
}

export default App
