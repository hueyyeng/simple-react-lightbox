import styled from "styled-components";
import { animated } from "react-spring";

const SRLLightboxGalleryStage = styled(animated.div)`
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
  #items {
    background: transparent;
    border: 0;
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: auto;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
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
  margin: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: opacity 500ms ease;

  &.image-transition-enter {
    opacity: 0;
  }
  &.image-transition-enter-active {
    opacity: 1;
    transition: opacity 1000ms ease, transform 300ms ease;
    position: absolute;
    z-index: -1;
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
`;

const StyledButton = styled.button`
  border: none;
  display: block;
  height: 40px;
  width: 40px;
  overflow: visible;
  position: relative;
  background-color: rgba(30, 30, 36, 0.8);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
  z-index: 9992;
  &:focus {
    outline: none;
  }
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
`;

const SRRLLightboxCloseIcon = styled(StyledButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SRLLightboxNextIcon = styled(StyledButton)`
  position: absolute;
  top: calc(50% - 50px);
  right: 10px;
`;

const SRLLightboxPrevIcon = styled(StyledButton)`
  position: absolute;
  top: calc(50% - 50px);
  left: 10px;
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
