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

const SRLLightboxSlide = styled.div`
  padding: ${props => (props.thumbnailGallery ? "40px 0 80px 0" : "40px 0")};
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const SRLLightboxContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  width: ${props =>
    props.thumbnailGallery ? "calc(100vw - 80px)" : "calc(100vw - 40px)"};
  height: ${props =>
    props.thumbnailGallery ? "calc(100vh - 80px)" : "calc(100vh - 40px)"};
`;

const SRLLightboxImage = styled.img`
  background: transparent;
  border: 0;
  max-height: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export {
  SRLLightboxGalleryStage,
  SRLLightboxSlide,
  SRLLightboxContent,
  SRLLightboxImage
};
