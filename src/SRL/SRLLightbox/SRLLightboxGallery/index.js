import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { SRLLightboxGalleryStage } from "./styles";
import SRLLightboxSlideComponent from "./SRLLightboxSlide";
import SRLLightboxControls from "./SRLLightboxControls";

const _findIndex = require("lodash/findIndex");
const _find = require("lodash/find");

const SRLLightboxGallery = ({
  options,
  selectedElement,
  elements,
  isOpened,
  dispatch
}) => {

// Destructuring the options
const { autoplaySpeed } = options;

  // In this component we set the state using the context.
  // We don't want to manipulate the context every time so we create a localized state
  // The first element will be the one that is clicked
  const [currentElement, setCurrentElement] = useState(selectedElement)
  // Let's set a state for the "autoplay" option
  const [autoplay, setAutoplay] = useState(false)

  // Handle Previous Element
  const handlePrevElement = useCallback(
    id => {
      /* We receive the ID of the current element and we want the element after that.
        Let's find the current position of the current element in the array */
      // const currentPosition = imagesGallery.findIndex(i => i.id === id);
      const currentPosition = _findIndex(elements, function(i) {
        return i.id === id;
      });
      /* The prev element will be the prev item in the array but it could be "undefined" as it goes negative. If it does we need to start from the last item. */
      const prevElement =  elements[currentPosition - 1] || elements[elements.length - 1];
      // Set the state with the new element
      setCurrentElement({
        source: prevElement.source,
        caption: prevElement.caption,
        id: prevElement.id,
        width: prevElement.width,
        height: prevElement.height
      });
    },
    [elements]
  );

  // Handle Next element
  const handleNextElement = useCallback(
    id => {
      /* We receive the ID of the current element and we want the element after that.
      Let's find the current position of the current element in the array */
      const currentPosition = _findIndex(elements, function(i) {
        return i.id === id;
      });
      /* The next element will be the next item in the array but it could be "undefined". If it's undefined we know we have reached the end and we go back to the first item */
      const nextElement = elements[currentPosition + 1] || elements[0];
      // Set the state with the new element
      setCurrentElement({
        source: nextElement.source,
        caption: nextElement.caption,
        id: nextElement.id,
        width: nextElement.width,
        height: nextElement.height
      });
    },
    [elements]
  );

  // Handle Current Element
  const handleCurrentElement = useCallback(
    id => {
      const currentElement = _find(elements, function(i) {
        return i.id === id;
      });
      // Set the state with the new element
      setCurrentElement({
        source: currentElement.source,
        caption: currentElement.caption,
        id: currentElement.id,
        width: currentElement.width,
        height: currentElement.height
      });
    },
    [elements]
  );


  // Handle Close Lightbox
  const handleCloseLightbox = useCallback(
    () => {
      dispatch({
        type: 'CLOSE_LIGHTBOX',
      });
    },
    [dispatch],
  )

  // Handle Autoplay
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  // Handle Navigation With Keys
  const handleLightboxWithKeys = useCallback(
    event => {
      if (event.keyCode === 39) {
        handleNextElement(currentElement.id);
      } else if (event.keyCode === 37) {
        handlePrevElement(currentElement.id);
      } else if (event.keyCode === 27) {
        handleCloseLightbox();
      }
    },
    [currentElement.id, handleCloseLightbox, handleNextElement, handlePrevElement]
  );

  useInterval(
    () => handleNextElement(currentElement.id),
    autoplay ? autoplaySpeed : null
  );

  useEffect(() => {

    // Sets the current element to be the first item in the array if the id is undefined. This is crucial in case the user uses the provided method to open the lightbox from a link or a button (using the High Order Component) etc...
    if (currentElement.id === undefined) {
      setCurrentElement({
        source: elements[0].source,
        caption: elements[0].caption,
        id: elements[0].id,
        width: elements[0].width,
        height: elements[0].height
      });
    }

    // Adds a class to the body to remove the overflow and compensate for the scroll-bar margin
    if (isOpened) {
      document.body.classList.add("SRLOpened");
      document.addEventListener(
        "keydown",
        handleLightboxWithKeys,
        { once: true },
        false
      );
    }
    // Cleans up function to remove the class from the body
    return function cleanUp() {
      document.body.classList.remove("SRLOpened");
      document.removeEventListener("keydown", handleLightboxWithKeys, false);
    };

  }, [currentElement, elements, handleLightboxWithKeys, isOpened, options])


  // Light-box controls
  const controls = {
    currentElementID: currentElement.id,
    handleCurrentElement,
    handleNextElement,
    handlePrevElement,
    handleCloseLightbox,
    autoplay,
    autoplaySpeed,
    setAutoplay
  };

  // Light-box buttons options
  const buttonOptions = {
    buttonsBackgroundColor: options.buttonsBackgroundColor,
    buttonsIconColor: options.buttonsIconColor,
    buttonsSize: options.buttonsSize,
    buttonsIconPadding: options.buttonsIconPadding
  }

  return (
    <SRLLightboxGalleryStage overlayColor={options.overlayColor}>
      <SRLLightboxControls {...buttonOptions} {...controls} />
      <SRLLightboxSlideComponent {...currentElement} {...controls} elements={elements} options={options} />
    </SRLLightboxGalleryStage>
    )
}

SRLLightboxGallery.propTypes = {
  options: PropTypes.object,
  overlayColor: PropTypes.string,
  selectedElement: PropTypes.object,
  elements: PropTypes.array,
  isOpened: PropTypes.bool,
  dispatch: PropTypes.func
};

export default SRLLightboxGallery;
