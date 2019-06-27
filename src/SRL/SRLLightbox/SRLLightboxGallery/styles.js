import styled from "styled-components";

const SRLLightboxGalleryStage = styled.div`
  background-color: ${props => props.overlaycolor};
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
  width: ${props => (props.showthumbnails ? "70vw" : "80vw")};
  height: ${props => (props.showthumbnails ? "70vh" : "80vh")};
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${props => (props.showcaption && props.showcaption ? 0 : "auto")};
  position: relative;
  @media (max-width: 768px) {
    width: 100vw;
    height: ${props => (props.showthumbnails ? "70vh" : "80vh")};
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
  p {
    margin: 0;
    padding: 0;
    font-family: inherit;
    text-align: center;
    background-color: transparent;
    color: ${props => (props.captioncolor ? props.captioncolor : "white")};
  }
`;

const StyledButton = styled.button`
  background-clip: content-box;
  height: 70px;
  position: absolute;
  width: 70px;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
  background-color: rgba(30, 30, 36, 0.8);
  border: 0;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  visibility: inherit;
  z-index: 9992;
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
        fill: currentColor;
      }
    }
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
`;

const SRRLLightboxCloseIcon = styled(StyledButton)`
  top: 0;
  right: 0;
  padding: 15px;
`;

const SRLLightboxNextIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  padding: 15px;
  right: 0;
  right: env(safe-area-inset-right);
`;

const SRLLightboxPrevIcon = styled(StyledButton)`
  top: calc(50% - 50px);
  padding: 15px;
  left: 0;
  left: env(safe-area-inset-left);
`;

const SRLLightboxThubnailGallery = styled.div`
  display: flex;
  color: white;
  height: 80px;
  width: 100%;
  justify-content: center;
  align-self: flex-end;
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
  SRLLightboxThubnailGallery,
  SRLLightboxThubnailGalleryImage
};
