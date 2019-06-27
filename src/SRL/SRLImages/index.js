import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SRLCtx } from "../SRLContext";

const SRLImages = props => {
  // Imports the context
  const context = useContext(SRLCtx);
  const [images, setImages] = useState([]);
  const [isImageSet, setIsImageSet] = useState(false);

  // Sets a new Ref which will be used to target the div with the images
  const imagesContainer = useRef(null);

  // Grabs the images and set them using setImages
  useEffect(() => {
    // Gets an HTMLCollection which we need to change to a normal array
    let collectedImages = imagesContainer.current.getElementsByTagName("img");

    // Checks if collectedImages is not empty (which means there were no images)
    if (collectedImages.length > 0) {
      setImages(collectedImages);
      // Checks if images were correctly set and so that is not empty
      if (images.length > 0 && !isImageSet) {
        // Convert the images to an array that is not an HTMLCollection (IE 11 -_-)
        const imagesArray = Array.prototype.slice.call(images);
        // Uses a map to go through each images and do the following:
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
        });
        // 3 Avoid setting the ID and the event listener on the image AGAIN by setting true so it's skipped (because the useEffect will be triggered again as with the function below the component is going to be re-rendered again because the context is changing)
        setIsImageSet(true);
        // 4 Grabs the images with the new event listern and ID add add them to the context
        context.grabImages(images);
      }
    }
  }, [context, isImageSet, images]);

  return <div ref={imagesContainer}>{props.children}</div>;
};

export default SRLImages;

SRLImages.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

// WITHOUT HOOKS

// import React, {
//   Component,
// } from "react";
// import PropTypes from "prop-types";
// import { SRLCtx } from "../SRLContext";

// class SRLImages extends Component {
//   static propTypes = {
//     children: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.node),
//       PropTypes.node
//     ]).isRequired,
//     context: PropTypes.object,
//     grabImages: PropTypes.func
//   };

//   constructor() {
//     super();
//     this.state = {
//       imagesArray: []
//     };
//     this.imgContainer = React.createRef();
//   }

//   componentDidMount() {
//     const content = this.imgContainer.current;
//     const images = content.getElementsByTagName("img");
//     this.setState({ imagesArray: [...images] });
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.imagesArray !== prevState.imagesArray) {
//       this.state.imagesArray.map((i, index) => {
//         // Let's set an ID for the images that we will use for the next/prev image function
//         i.id = `img${index}`;
//         // Let's add an event listener that will actually trigger the function to open the lightbox when clicking on an image
//         i.addEventListener("click", e => {
//           // We pass some argument to the function which are needed to update the context with the selected image
//           this.props.context.handleLightbox(
//             e.target.currentSrc,
//             e.target.alt,
//             e.target.id
//           );
//         });
//         return null;
//       });
//       this.props.context.grabImages(this.state.imagesArray);
//     }
//   }

//   render() {
//     return <div ref={this.imgContainer}>{this.props.children}</div>;
//   }
// }

// // We wrap this using our HOC component so we have access to the context
// export default withContext(SRLImages);
