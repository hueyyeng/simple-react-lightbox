import styled from "@emotion/styled";

// Main div containing the light-box
const SRLLightboxGalleryStage = styled.div`
  background-color: ${props => props.overlayColor};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9991;
`;

// The content of the light-box
const SRLLightboxContent = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

// The container for the image
const SRLLightboxImageContainer = styled.div`
  width: ${props => {
    if (props.showThumbnails === false && !!props.showCaption === false) {
      return "90vw";
    } else if (props.showThumbnails === false && props.showCaption === true) {
      return "85vw";
    } else if (props.showThumbnails === true && props.showCaption === false) {
      return "75vw";
    } else {
      return "70vw";
    }
  }};
  height: ${props => {
    if (props.showThumbnails === false && !!props.showCaption === false) {
      return "90vh";
    } else if (props.showThumbnails === false && props.showCaption === true) {
      return "85vh";
    } else if (props.showThumbnails === true && props.showCaption === false) {
      return "75vh";
    } else {
      return "70vh";
    }
  }};
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${props => {
    if (props.showThumbnails === false && !!props.showCaption === false) {
      return "0px";
    } else if (props.showThumbnails === false && props.showCaption === true) {
      return "auto";
    } else if (props.showThumbnails === true && props.showCaption === false) {
      return "auto";
    } else {
      return "auto";
    }
  }};
  position: relative;
  @media (max-width: 768px) {
    width: 100vw;
    height: ${props => (props.showThumbnails ? "70vh" : "80vh")};
  }
  .SRLTransitionGroup {
    width: 100%;
    height: 100%;
  }
`;

// The image itself
const SRLLightboxImage = styled.img`
  background: transparent;
  border: 0;
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: opacity 500ms ease;
  opacity: 1;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.image-transition-enter {
    opacity: 0;
  }
  &.image-transition-enter-active {
    opacity: 1;
    transition: ${props =>
      props.transitionSpeed
        ? `opacity ${props.transitionSpeed + 600}ms ease, transform ${
            props.transitionSpeed
          }ms ease`
        : "opacity 1200ms ease, transform 600ms ease"};
  }
  &.image-transition-exit {
    opacity: 1;
  }
  &.image-transition-exit-active {
    opacity: 0;
    transition: ${props =>
      props.transitionSpeed
        ? `opacity ${props.transitionSpeed}ms ease, transform ${props.transitionSpeed}ms ease`
        : "opacity 600ms ease;"};
  }
  &.image-transition-enter-done {
    opacity: 1;
    transition: ${props =>
      props.transitionSpeed
        ? `opacity ${props.transitionSpeed}ms ease, transform ${props.transitionSpeed}ms ease`
        : "opacity 600ms ease;"};
  }
`;

// The caption
const SRRLLightboxCaption = styled.div`
  color: white;
  font-family: inherit;
  margin-top: 20px;
  width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 0;
  }
  p {
    margin: 0;
    padding: 0;
    text-align: center;
    background-color: transparent;
    @media (max-width: 768px) {
      padding: 0 15px;
    }
    font-weight: ${props =>
      props.captionStyle.captionFontWeight
        ? props.captionStyle.captionFontWeight
        : "inherit"};
    font-size: ${props =>
      props.captionStyle.captionFontSize
        ? props.captionStyle.captionFontSize
        : "inherit"};
    font-family: ${props =>
      props.captionStyle.captionColor
        ? props.captionStyle.captionFontFamily
        : "inherit"};
    color: ${props =>
      props.captionStyle.captionColor
        ? props.captionStyle.captionColor
        : "white"};
    text-transform: ${props =>
      props.captionStyle.captionFontStyle
        ? props.captionStyle.captionFontStyle
        : "inherit"};
  }
`;

// The buttons
const StyledButton = styled.button`
  background-clip: content-box;
  height: 70px;
  position: absolute;
  width: 70px;
  transition: color 0.3s ease;
  background-color: ${props =>
    props.buttonsStyle.buttonsBackgroundColor
      ? props.buttonsStyle.buttonsBackgroundColor
      : "rgba(30, 30, 36, 0.8)"};
  border: 0;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  visibility: inherit;
  z-index: 9992;
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    padding: 0;
  }
  &:focus {
    outline: none;
  }
  div {
    padding: 7px;
    height: 100%;
    box-sizing: border-box;
    svg {
      display: block;
      height: 100%;
      overflow: visible;
      position: relative;
      width: 100%;
      path {
        transition: fill 0.3s ease;
        fill: ${props =>
          props.buttonsStyle.buttonsIconColor
            ? props.buttonsStyle.buttonsIconColor
            : "rgba(255, 255, 255, 0.8)"};
      }
    }
    &:hover {
      svg path {
        fill: ${props =>
          props.buttonsStyle.buttonsIconColor &&
          // REGEX TO THE RESCUE (converts the RGBA value to have the full opacity to have the nice "hover" effect)
          props.buttonsStyle.buttonsIconColor.replace(/[\d\.]+\)$/g, "1)")};
      }
    }
  }
`;

// The "close" button
const SRRLLightboxCloseIcon = styled(StyledButton)`
  top: 0;
  right: 0;
  padding: 15px;
  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
  }
`;

// The "autoplay" button
const SRRLLightboxAutoplayIcon = styled(StyledButton)`
  top: 0;
  right: 50px;
  padding: 15px;
  display: ${props => (props.autoplaySpeed === 0 ? "none" : "block")};
  @media (max-width: 768px) {
    top: 5px;
  }
`;

// The "next" button
const SRLLightboxNextIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  padding: 15px;
  right: 0;
  right: env(safe-area-inset-right);
  @media (max-width: 768px) {
    display: none;
  }
`;

// The "prev" button
const SRLLightboxPrevIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  padding: 15px;
  left: 0;
  left: env(safe-area-inset-left);
  @media (max-width: 768px) {
    display: none;
  }
`;

// The thumbnails galley
const SRLLightboxThubnailGallery = styled.div`
  display: flex;
  color: white;
  height: 80px;
  width: 100%;
  justify-content: center;
  align-self: flex-end;
  flex-wrap: nowrap;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 768px) {
    justify-content: start;
  }
`;

// The images on the thumbnail gallery
const SRLLightboxThubnailGalleryImage = styled.a`
  width: 100px;
  height: 80px;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 1px;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  display: block;
  cursor: pointer;
  flex: 0 0 auto;
  &:first-of-type {
    margin: 0;
  }
  &:last-child {
    margin: 0;
  }
  &.SRLSelected {
    opacity: 1;
  }
`;

// Export all of the above
export {
  SRLLightboxGalleryStage,
  SRLLightboxContent,
  SRLLightboxImageContainer,
  SRLLightboxImage,
  SRRLLightboxCaption,
  SRRLLightboxCloseIcon,
  SRLLightboxNextIcon,
  SRLLightboxPrevIcon,
  SRRLLightboxAutoplayIcon,
  SRLLightboxThubnailGallery,
  SRLLightboxThubnailGalleryImage
};
