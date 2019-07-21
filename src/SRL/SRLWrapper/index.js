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
    let collectedImages = imagesContainer.current.getElementsByTagName("img");
    // Gets all the links with the "SRL" attribute. This is in case the user wants to create a "custom" gallery.
    let collectedLinks = imagesContainer.current.querySelectorAll(
      "a[data-attribute='SRL']"
    );
    const imagesArray = Array.prototype.slice.call(collectedImages);
    const collectedLinksArray = Array.prototype.slice.call(collectedLinks);
    // Checks if collectedImages is not empty (which means there were no images)
    // Checks if collectedLinks is empty which means that the user is just using images
    if (collectedImages.length > 0 && collectedLinks.length === 0) {
      if (!isImageSet) {
        let images = [];
        // Iterates through each image
        imagesArray.map((i, index) => {
          // Assigns a new ID attribute to the image
          i.id = `img${index}`;
          // Creates a temporary image object
          let image = {
            src: i.src, // Grabs the "src" attribute from the image
            alt: i.alt, // Grabs the "alt" attribute from the image,
            id: i.id, // Grabs the newly created "id" attribute from the image
            width: i.width, // Grabs the "width" attribute from the image
            height: i.height // Grabs the "height" attribute from the image
          };
          images.push(image);
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
        // Dispatch the action to set the images from the context
        context.grabImages(images);
      }
    }
    if (collectedLinks.length > 0) {
      if (collectedImages.length !== collectedLinks.length) {
        // Throws a warning if the number of links is not equal to the number of images
        console.warn(
          `Hey. You have ${collectedLinks.length} links and ${
            collectedImages.length
          }. You likely forgot to add the data-attribute="SRL" to one or more than one of your images!`
        );
      }
      if (!isImageSet) {
        let images = [];
        // Iterates through each link
        collectedLinksArray.map((a, index) => {
          // Assigns a new ID attribute to the image (children of the link)
          a.children[0].id = `img${index}`;
          // Creates a temporary image object
          let image = {
            src: a.href, // Grabs the "href" attribute from the link (not from the image)
            alt: a.children[0].alt, // Grabs the "alt" attribute from the image
            id: a.children[0].id, // Grabs the newly created "id" attribute from the image
            width: a.children[0].width, // Grabs the "width" attribute from the image
            height: a.children[0].height // Grabs the "height" attribute from the image
          };
          images.push(image);
          // Adds an event listerner that will trigger the function to open the lightbox (passed using the Context)
          a.addEventListener("click", e => {
            e.preventDefault();
            context.handleLightbox(
              /*
              This is slightly different from the one above as we want to grab
              the "href" attribute of the link, not the "src" attribute of the image
              */
              e.target.parentNode.href,
              e.target.alt,
              e.target.id,
              e.target.width,
              e.target.height
            );
          });
          // Avoid ifinite re-rendering by changing this value to TRUE
          setIsImageSet(true);
        });
        // Dispatch the action to set the images from the context
        context.grabImages(images);
      }
    }
  }, [context, isImageSet, props]);

  return <div ref={imagesContainer}>{props.children}</div>;
};

export default SRLWrapper;

SRLWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
