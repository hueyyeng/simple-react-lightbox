import styled from "styled-components";

const SRLLightboxGalleryStage = styled.div`
  background-color: ${props => props.overlayColor};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9991;
  .image {
    width: 80vw;
    height: 80vh;
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }
`;

const SRLLightboxContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SRLLightboxImageContainer = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: column;
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
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const SRRLLightboxCaption = styled.span`
  color: white;
  font-family: inherit;
  margin-top: 20px;
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
  z-index: 1;
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
  margin-top: auto;
  color: white;
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
  SRLLightboxThubnailGallery
};
