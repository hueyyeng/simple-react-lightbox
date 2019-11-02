import React, { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SRLCtx } from "../SRLContext";

const SRLWrapper = ({ options, children }) => {

  // IsEqual from loadash to do a deep comparison of the objects
  const isEqual = require("lodash/isEqual");

  // Imports the context
  const context = useContext(SRLCtx);

  // Sets a new Ref which will be used to target the div with the images
  const imagesContainer = useRef(null);

  console.log(context)

  useEffect(() => {

    // Dispatch the Action the options
    const grabOptions = (options) => {
      if (!isEqual(options, context.options)) {
        console.log("dispatched options")
        context.dispatch({
          type: 'GRAB_OPTIONS',
          options
        })
      }
    }

    // Dispatch the Action the grab the elements
    const grabElements = (elements) => {
      if (!isEqual(elements, context.elements)) {
        console.log("dispatched grab elements")
        context.dispatch({
          type: 'GRAB_ELEMENTS',
          elements
        })
      }
    }

    // Dispatch the Action to handle the clicked item
    const handleElement = (element) => {
      // We don't want to dispatch the action if the selected image is already selected
      if (!isEqual(element, context.selectedElement)) {
        console.log("dispatched grab element (single)")
        context.dispatch({
          type: 'HANDLE_ELEMENT',
          element
        })
      }
    }

    // Loop through the elemenents or the links to add them to the context
    const handleElementsWithContext = (array) => {
      if (array !== 0) {
        const elements = array.map((e, index) => {
          e.id = `element${index}`
          // Check if it's an image
          const isImage = (/\.(gif|jpg|jpeg|tiff|png|webp)$/i).test(e.currentSrc);
          // Creates an object for each element
          const element = {
            // Grabs the "src" attribute from the image/video.
            // If it's a link grabs the "href" attribute.
            source: e.currentSrc || e.src || e.href || null,
            // Grabs the "alt" attribute from the image or the "textContent" from the video.
            // If it's a link grabs the "alt" attribute from the children image.
            caption: e.alt || e.textContent || e.children[0].alt || null,
            // Grabs the newly created "id" attribute from the image/video
            // If it's a link grabs the "id" attribute from the children image.
            id: e.id || e.children[0].id || null,
            // Grabs the "width" from the image/video
            // If it's a link we can't grab the width and we will need to calculate it after
            width: isImage ? e.naturalWidth || null : e.videoWidth || null,
            // Grabs the "height" from the image/video
            // If it's a link we can't grab the height and we will need to calculate it after.
            height: isImage ? e.naturalHeight || null : e.videoHeight || null
          };

          // Adds an event listerner that will trigger the function to open the lightbox (passed using the Context)
          e.addEventListener("click", e => {
            // Prevent the image from opening
            e.preventDefault();
            // Run the function to handle the clicked item
            handleElement(element)
          });

          // Return the image for the map function
          return element;

        })
        grabElements(elements)
      }
    }

    // Grabs the options set by the user first
    grabOptions({ ...options })
    // Grabs images and videos
    const collectedElements = imagesContainer.current.querySelectorAll("img,video");
    // Grabs data attributes (in links)
    const collectedDataAttributes = imagesContainer.current.querySelectorAll("a[data-attribute='SRL']");
    // Converts the HTMLCollections in to arrays
    const elementsArray = Array.prototype.slice.call(collectedElements)
    const dataAttributesArray = Array.prototype.slice.call(collectedDataAttributes)
    // Checks if the user is not using the "data-attribute"
    if (collectedDataAttributes.length === 0) {
      handleElementsWithContext(elementsArray)
    } else if (collectedDataAttributes.length > 0) {
      handleElementsWithContext(dataAttributesArray)
      // Throws a warning if the number of links is not equal to the number of images
      if (dataAttributesArray.length !== elementsArray.length) {
        console.warn(
          `HEY!. You have ${dataAttributesArray.length} links and ${elementsArray.length} images. You likely forgot to add the data-attribute="SRL" to one of your link wrapping your image!`
        );
      }
    }
  }, [options, isEqual, context])


  return <div ref={imagesContainer}>{children}</div>;
};

export default SRLWrapper;

SRLWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  options: PropTypes.object
};
