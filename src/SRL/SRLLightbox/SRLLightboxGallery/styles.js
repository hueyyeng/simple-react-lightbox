import styled from "styled-components";

const SRLLightboxGalleryStage = styled.div`
  background-color: ${props => props.overlayColor};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9991;
`;

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
    transition: opacity 800ms ease, transform 300ms ease;
  }
  &.image-transition-exit {
    opacity: 1;
  }
  &.image-transition-exit-active {
    opacity: 0;
    transition: opacity 500ms ease;
  }
  &.image-transition-enter-done {
    opacity: 1;
    transition: opacity 500ms ease;
  }
`;

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
    font-family: inherit;
    text-align: center;
    background-color: transparent;
    color: ${props => (props.captionColor ? props.captionColor : "white")};
  }
`;

const StyledButton = styled.button`
  background-clip: content-box;
  height: 70px;
  position: absolute;
  width: 70px;
  transition: color 0.3s ease;
  background-color: ${props =>
    props.buttonsBackgroundColor
      ? props.buttonsBackgroundColor
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
    width: 40px;
    height: 40px;
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
          props.buttonsIconColor
            ? props.buttonsIconColor
            : "rgba(255, 255, 255, 0.8)"};
      }
    }
    &:hover {
      svg path {
        fill: ${props =>
          props.buttonsIconColor &&
          // REGEX TO THE RESCUE (converts the RGBA value to have the full opacity to have the nice "hover" effect)
          props.buttonsIconColor.replace(/[\d\.]+\)$/g, "1)")};
      }
    }
  }
`;

const SRRLLightboxCloseIcon = styled(StyledButton)`
  top: 0;
  right: 0;
  padding: 15px;
`;

const SRRLLightboxAutoplayIcon = styled(StyledButton)`
  top: 0;
  right: 50px;
  padding: 15px;
  display: ${props => (props.autoplaySpeed === 0 ? "none" : "block")};
`;

const SRLLightboxNextIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  padding: 15px;
  right: 0;
  right: env(safe-area-inset-right);
  @media (max-width: 768px) {
    display: none;
  }
`;

const SRLLightboxPrevIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  padding: 15px;
  left: 0;
  left: env(safe-area-inset-left);
  @media (max-width: 768px) {
    display: none;
  }
`;

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
  &:first-child {
    margin: 0;
  }
  &:last-child {
    margin: 0;
  }
  &.SRLSelected {
    opacity: 1;
  }
`;

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
