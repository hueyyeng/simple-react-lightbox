import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SRLCtx } from "../SRLContext";

const SRLWrapper = props => {
  // Imports the context
  const context = useContext(SRLCtx);

  // Sets a new Ref which will be used to target the div with the images
  const imagesContainer = useRef(null);

  // Creates a state to check if the images are set
  let [isImageSet, setIsImageSet] = useState(false);

  // Grabs the images and set them using setImages
  useEffect(() => {
    // Gets an HTMLCollection which we need to change to a normal array.
    // We want to extrapolate only the thing that we need, we don't want to pass an etire HTMLCollection to the context
    let collectedImages = imagesContainer.current.getElementsByTagName("img");
    const imagesArray = Array.prototype.slice.call(collectedImages);
    // Checks if collectedImages is not empty (which means there were no images)
    if (collectedImages.length > 0) {
      if (!isImageSet) {
        let images = [];
        // Iterates through each image
        imagesArray.map((i, index) => {
          // Assigns a new ID attribute to the image
          i.id = `img${index}`;
          // Creates a temporary image object
          let image = {
            src: i.src,
            alt: i.alt,
            id: i.id,
            width: i.width,
            height: i.height
          };
          images.push(image);
          // Dispatch the action to set the images
          context.grabImages(images);
          // Adds an event listerner that will trigger the function to open the lightbox (passed using the Context)
          i.addEventListener("click", e => {
            context.handleLightbox(
              e.target.src,
              e.target.alt,
              e.target.id,
              e.target.width,
              e.target.height
            );
          });
          // Avoid ifinite re-rendering by changing this value to TRUE
          setIsImageSet(true);
        });
      }
    }
  }, [context, isImageSet]);

  return <div ref={imagesContainer}>{props.children}</div>;
};

export default SRLWrapper;

SRLWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
