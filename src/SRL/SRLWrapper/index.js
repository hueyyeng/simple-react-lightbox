import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SRLCtx } from "../SRLContext";

const SRLWrapper = ({options, children}) => {

  // IsEqual from loadash to do a deep comparison of the objects
  const isEqual = require("lodash/isEqual");

  // Imports the context
  const context = useContext(SRLCtx);

  // Sets a new Ref which will be used to target the div with the images
  const imagesContainer = useRef(null);

  // // Creates a state to check if the images are set
  // const [isImageSet, setIsImageSet] = useState(false);

  console.log(context)

  // Dispatch the Action the options
  const grabOptions = (options) => {
    if(!isEqual(options, context.options)) {
      context.dispatch({
        type: 'GRAB_OPTIONS',
        options
      })
    }
  }

  // Dispatch the Action the grab the elements
  function grabElements(elements) {
    if(!isEqual(elements, context.elements)) {
      context.dispatch({
        type: 'GRAB_ELEMENTS',
        elements
      })
    }
  }

// Loop through the elemenents or the links to add them to the context
function addElementsToContext(array) {
    console.log(array)
    if(array !== 0) {
      const elements = array.map((e, index) => {
        e.id = `element${index}`
        // Check if it's an image
        const isImage = (/\.(gif|jpg|jpeg|tiff|png|webp)$/i).test(e.currentSrc);
        // Creates an object for each element
          return {
            // Grabs the "src" attribute from the image/video.
            // If it's a link grabs the "href" attribute.
            src: e.currentSrc || e.href || null,
            // Grabs the "alt" attribute from the image or the "textContent" from the video.
            // If it's a link grabs the "alt" attribute from the children image.
            alt: e.alt || e.textContent || e.children[0].alt || null,
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
      })
      grabElements(elements)
    }
  }

  useEffect(() => {
    // Grabs the options set by the user first
    grabOptions({...options})
    // Grabs images and videos
    const collectedElements = imagesContainer.current.querySelectorAll("img,video");
    // Grabs data attributes (in links)
    const collectedDataAttributes = imagesContainer.current.querySelectorAll("a[data-attribute='SRL']");
    // Converts the HTMLCollections in to arrays
    const elementsArray = Array.prototype.slice.call(collectedElements)
    const dataAttributesArray = Array.prototype.slice.call(collectedDataAttributes)
    // Checks if the user is not using the "data-attribute"
    if(collectedDataAttributes.length === 0) {
      addElementsToContext(elementsArray)
    } else if( collectedDataAttributes.length > 0 ) {
      addElementsToContext(dataAttributesArray)
    }
  }, [context.elements, context.options])


  // // Grabs the images and set them using setImages
  // useEffect(() => {
  //   // Gets an HTMLCollection which we need to change to a normal array.
  //   let collectedImages = imagesContainer.current.getElementsByTagName("img");
  //   // Gets all the links with the "SRL" attribute. This is in case the user wants to create a "custom" gallery.
  //   let collectedLinks = imagesContainer.current.querySelectorAll(
  //     "a[data-attribute='SRL']"
  //   );
  //   const imagesArray = Array.prototype.slice.call(collectedImages);
  //   const collectedLinksArray = Array.prototype.slice.call(collectedLinks);
  //   // Checks if collectedImages is not empty (which means there were no images)
  //   // Checks if collectedLinks is empty which means that the user is just using images
  //   if (collectedImages.length > 0 && collectedLinks.length === 0) {
  //     if (!isImageSet) {
  //       let images = [];
  //       // Iterates through each image
  //       imagesArray.map((i, index) => {
  //         // Assigns a new ID attribute to the image
  //         i.id = `img${index}`;
  //         // Creates a temporary image object
  //         let image = {
  //           src: i.src, // Grabs the "src" attribute from the image
  //           alt: i.alt, // Grabs the "alt" attribute from the image,
  //           id: i.id, // Grabs the newly created "id" attribute from the image
  //           width: i.width, // Grabs the "width" attribute from the image
  //           height: i.height // Grabs the "height" attribute from the image
  //         };
  //         images.push(image);
  //         // Adds an event listerner that will trigger the function to open the lightbox (passed using the Context)
  //         i.addEventListener("click", e => {
  //           context.handleLightbox(
  //             e.target.src,
  //             e.target.alt,
  //             e.target.id,
  //             e.target.width,
  //             e.target.height
  //           );
  //         });
  //         // Avoid ifinite re-rendering by changing this value to TRUE
  //         setIsImageSet(true);
  //       });
  //       // Dispatch the action to set the images from the context
  //       context.grabImages(images);
  //     }
  //   }
  //   if (collectedLinks.length > 0) {
  //     if (collectedImages.length !== collectedLinks.length) {
  //       // Throws a warning if the number of links is not equal to the number of images
  //       console.warn(
  //         `Hey. You have ${collectedLinks.length} links and ${
  //           collectedImages.length
  //         }. You likely forgot to add the data-attribute="SRL" to one or more than one of your images!`
  //       );
  //     }
  //     if (!isImageSet) {
  //       let images = [];
  //       // Iterates through each link
  //       collectedLinksArray.map((a, index) => {
  //         // Assigns a new ID attribute to the image (children of the link)
  //         a.children[0].id = `img${index}`;
  //         // Creates a temporary image object
  //         let image = {
  //           src: a.href, // Grabs the "href" attribute from the link (not from the image)
  //           alt: a.children[0].alt, // Grabs the "alt" attribute from the image
  //           id: a.children[0].id, // Grabs the newly created "id" attribute from the image
  //           width: a.children[0].width, // Grabs the "width" attribute from the image
  //           height: a.children[0].height // Grabs the "height" attribute from the image
  //         };
  //         images.push(image);
  //         // Adds an event listerner that will trigger the function to open the lightbox (passed using the Context)
  //         a.addEventListener("click", e => {
  //           e.preventDefault();
  //           context.handleLightbox(
  //             /*
  //             This is slightly different from the one above as we want to grab
  //             the "href" attribute of the link, not the "src" attribute of the image
  //             */
  //             e.target.parentNode.href,
  //             e.target.alt,
  //             e.target.id,
  //             e.target.width,
  //             e.target.height
  //           );
  //         });
  //         // Avoid ifinite re-rendering by changing this value to TRUE
  //         setIsImageSet(true);
  //       });
  //       // Dispatch the action to set the images from the context
  //       context.grabImages(images);
  //     }
  //   }
  // }, [context, isImageSet, props]);

  return <div ref={imagesContainer}>{children}</div>;
};

export default SRLWrapper;

SRLWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
