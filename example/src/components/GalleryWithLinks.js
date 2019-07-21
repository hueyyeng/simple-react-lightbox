import React from "react";
import Layout from "./Layout";
import { SRLWrapper } from "simple-react-lightbox";

function GalleryWithLinks() {
  return (
    <Layout>
      <SRLWrapper>
        <div id="gallery-with-links" className="container content">
          <div className="row">
            <div className="col-md-4 col-6 col-image-with-link">
              <a
                href="https://www.michelec.site/app/uploads/SRL/ExampleGallery/unsplash17.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.michelec.site/app/uploads/SRL/ExampleGallery/thumbnails/unsplash17_thumb.jpg"
                  alt="A small boat"
                />
              </a>
            </div>
            <div className="col-md-4 col-6 col-image-with-link">
              <a
                href="https://www.michelec.site/app/uploads/SRL/ExampleGallery/unsplash18.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.michelec.site/app/uploads/SRL/ExampleGallery/thumbnails/unsplash18_thumb.jpg"
                  alt="Umbrella"
                />
              </a>
            </div>
            <div className="col-md-4 col-6 col-image-with-link">
              <a
                href="https://www.michelec.site/app/uploads/SRL/ExampleGallery/unsplash19.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.michelec.site/app/uploads/SRL/ExampleGallery/thumbnails/unsplash19_thumb.jpg"
                  alt="Penguins kissed by the sun"
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.michelec.site/app/uploads/SRL/ExampleGallery/unsplash20.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.michelec.site/app/uploads/SRL/ExampleGallery/thumbnails/unsplash20_thumb.jpg"
                  alt="A peaceful lake."
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.michelec.site/app/uploads/SRL/ExampleGallery/unsplash21.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.michelec.site/app/uploads/SRL/ExampleGallery/thumbnails/unsplash21_thumb.jpg"
                  alt="Small insect"
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.michelec.site/app/uploads/SRL/ExampleGallery/unsplash22.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.michelec.site/app/uploads/SRL/ExampleGallery/thumbnails/unsplash22_thumb.jpg"
                  alt="Desert lizard"
                />
              </a>
            </div>
            <div className="col-md-3 col-6 col-image-with-link">
              <a
                href="https://www.michelec.site/app/uploads/SRL/ExampleGallery/unsplash23.jpg"
                data-attribute="SRL"
              >
                <img
                  src="https://www.michelec.site/app/uploads/SRL/ExampleGallery/thumbnails/unsplash23_thumb.jpg"
                  alt="When in Rome..."
                />
              </a>
            </div>
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  );
}

export default GalleryWithLinks;
