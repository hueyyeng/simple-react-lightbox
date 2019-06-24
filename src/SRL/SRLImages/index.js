import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { SRLCtxt } from "../SRLContext";

const SRLImagesContext = props => {
  // Import the context
  const context = useContext(SRLCtxt);
  const [images, setImages] = useState([]);

  // We set a ref
  const imagesContainer = useRef(null);

  // Grab all the images from the div in which we wrap the component and set them using the useState hook
  useEffect(() => {
    let collectedImages = imagesContainer.current.getElementsByTagName("img");

    if (collectedImages.length > 0) {
      setImages(collectedImages);
      if (images.length > 0) {
        const imagesArray = Array.prototype.slice.call(images); // IE 11 -_-
        imagesArray.map((i, index) => {
          // Let's set an ID for the images that we will use for the next/prev image function
          i.id = `img${index}`;
          // Let's add an event listener that will actually trigger the function to open the lightbox when clicking on an image
          i.addEventListener("click", e => {
            context.handleLightbox(
              e.target.src,
              e.target.alt,
              e.target.id,
              e.target.width,
              e.target.height
            );
          });
          return null;
        });
        // Grab the images
        context.grabImages(images);
      }
    }
    return undefined;
  }, [context, images]);

  return <div ref={imagesContainer}>{props.children}</div>;
};

export default SRLImagesContext;

SRLImagesContext.propTypes = {
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
// import { SRLCtxt } from "../SRLContext";

// class SRLImagesContext extends Component {
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
// export default withContext(SRLImagesContext);
