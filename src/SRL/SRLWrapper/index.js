import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SRLCtx } from "../SRLContext";

const SRLWrapper = props => {
  // Imports the context
  const context = useContext(SRLCtx);
  const [images, setImages] = useState([]);
  const [isImageSet, setIsImageSet] = useState(false);

  // Sets a new Ref which will be used to target the div with the images
  const imagesContainer = useRef(null);
  const imagesObject = [];
  // Grabs the images and set them using setImages
  useEffect(() => {
    // Gets an HTMLCollection which we need to change to a normal array.
    // We want to extrapolate only the thing that we need, we don't want to pass an etire HTMLCollection to the context
    let collectedImages = imagesContainer.current.getElementsByTagName("img");
    const imagesArray = Array.prototype.slice.call(collectedImages);

    // Checks if collectedImages is not empty (which means there were no images)
    if (collectedImages.length > 0) {
      // 1) Grabs the images. This will be empty on the first run but it will run again as we set setIsImageIsSet
      // When it runs the second time will grab the images and add them to the context
      context.grabImages(images);

      // Checks if images were correctly set and don't repeat this infinitely again
      if (!isImageSet) {
        // Uses a map to go through each images
        imagesArray.map((i, index) => {
          // 1) Sets an ID for the images that we will use for the next/prev image
          i.id = `img${index}`;
          // 2) Adds an event listerner that will trigger the function to open the lightbox (passed using the Context)
          i.addEventListener("click", e => {
            context.handleLightbox(
              e.target.src,
              e.target.alt,
              e.target.id,
              e.target.width,
              e.target.height
            );
          });
          // 3) Pushes each image to the temporary array of objects
          imagesObject.push({
            src: i.src,
            alt: i.alt,
            id: `img${index}`,
            width: i.width,
            height: i.height
          });
        });

        setImages(imagesObject);

        // Avoid ifinite re-rendering by changing this value to TRUE
        setIsImageSet(true);
      }
    }
  }, [context, images, imagesObject, isImageSet]);

  return <div ref={imagesContainer}>{props.children}</div>;
};

export default SRLWrapper;

SRLWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
