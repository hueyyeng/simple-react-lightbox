import PropTypes from 'prop-types'

import { ISRLLightboxControls } from '../../../../types'
import { useSizes } from '../../../SRLHooks'
import {
  SRLAutoplayIcon,
  SRLCloseIcon,
  SRLDownloadIcon,
  SRLExpandIcon,
  SRLNextIcon,
  SRLPrevIcon,
  SRLThumbnailsIcon,
  SRLTopButtons,
  SRLZoomOutIcon
} from '../../../styles/SRLButtonsStyles'

const SRLLightboxControls = ({
  autoplay,
  buttons,
  buttonsOffsetFromProgressBar,
  currentElementID,
  handleCloseLightbox,
  handleFullScreen,
  handleImageDownload,
  handleNextElement,
  handlePrevElement,
  handlePanzoom,
  handleThumbnails,
  hideThumbnails,
  panzoomEnabled,
  setAutoplay,
  settings,
  showProgressBar,
  showThumbnails,
  SRLThumbnailsRef,
  thumbnailsPosition
}: // thumbnailsSize
ISRLLightboxControls) => {
  /* Unfortunately, we need to calculate the offsetWidth of the thumbnails container
  by taking its "REF" from up above */
  const [thumbnailsDivSizes] = useSizes(SRLThumbnailsRef)

  return (
    <div>
      <SRLTopButtons
        className="SRLControls"
        autoplay={autoplay}
        showProgressBar={showProgressBar}
        buttonsOffsetFromProgressBar={buttonsOffsetFromProgressBar}
        thumbnailsPosition={thumbnailsPosition}
        thumbnailsDivSizes={thumbnailsDivSizes}
        hideThumbnails={hideThumbnails}
      >
        {buttons.showAutoplayButton && (
          <SRLAutoplayIcon
            buttonsBackgroundColor={buttons.backgroundColor}
            buttonsIconColor={buttons.iconColor}
            buttonsSize={buttons.size}
            buttonsIconPadding={buttons.iconPadding}
            autoplaySpeed={settings.autoplaySpeed}
            title={autoplay ? 'Pause' : 'Play'}
            className="SRLAutoplayButton"
            onClick={() => setAutoplay(!autoplay)}
          >
            <div className="SRLAutoplayButton">
              {!autoplay ? (
                <svg
                  className="SRLAutoplayButton"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="11 11 30 30"
                >
                  <path
                    className="SRLAutoplayButton"
                    d="M35.7 22.8L16.9 11.6c-1.5-.9-3.9 0-3.9 2.2v22.3c0 2 2.2 3.2 3.9 2.2l18.9-11.1c1.6-1 1.6-3.4-.1-4.4zm-.8 2.9L16 36.9c-.6.3-1.3-.1-1.3-.7V13.8c0-.9.9-1 1.3-.7l18.9 11.1c.5.4.5 1.2 0 1.5z"
                  />
                </svg>
              ) : (
                <svg
                  className="SRLAutoplayButton"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="11 11 30 30"
                >
                  <path
                    className="SRLAutoplayButton"
                    d="M14.2 38.7h5.9c1.6 0 2.9-1.3 2.9-2.9V14.2c0-1.6-1.3-2.9-2.9-2.9h-5.9c-1.6 0-2.9 1.3-2.9 2.9v21.6c0 1.6 1.3 2.9 2.9 2.9zm-1-24.5c0-.5.4-1 1-1h5.9c.5 0 1 .4 1 1v21.6c0 .5-.4 1-1 1h-5.9c-.5 0-1-.4-1-1V14.2zm16.7 24.5h5.9c1.6 0 2.9-1.3 2.9-2.9V14.2c0-1.6-1.3-2.9-2.9-2.9h-5.9c-1.6 0-2.9 1.3-2.9 2.9v21.6c0 1.6 1.3 2.9 2.9 2.9zm-1-24.5c0-.5.4-1 1-1h5.9c.5 0 1 .4 1 1v21.6c0 .5-.4 1-1 1h-5.9c-.5 0-1-.4-1-1V14.2z"
                  />
                </svg>
              )}
            </div>
          </SRLAutoplayIcon>
        )}

        {buttons.showThumbnailsButton && showThumbnails && (
          <SRLThumbnailsIcon
            buttonsBackgroundColor={buttons.backgroundColor}
            buttonsIconColor={buttons.iconColor}
            buttonsSize={buttons.size}
            buttonsIconPadding={buttons.iconPadding}
            thumbnailsPosition={thumbnailsPosition}
            onClick={handleThumbnails}
            title={hideThumbnails ? 'Show Thumbnails' : 'Hide Thumbnails'}
            className="SRLThumbnailsButton"
          >
            <div className="SRLThumbnailsButton">
              <svg
                className="SRLThumbnailsButton"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="11 11 30 30"
              >
                <g fill="#fff" className="SRLThumbnailsButton">
                  <path
                    className="SRLThumbnailsButton"
                    d="M15.4 27.4h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm12 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm12 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4z"
                    opacity=".4"
                  />
                  <path
                    className="SRLThumbnailsButton"
                    d="M39.4 13h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm-24 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4zm12 0h-4.8c-1.3 0-2.4 1.1-2.4 2.4v4.8c0 1.3 1.1 2.4 2.4 2.4h4.8c1.3 0 2.4-1.1 2.4-2.4v-4.8c0-1.3-1.1-2.4-2.4-2.4z"
                  />
                </g>
              </svg>
            </div>
          </SRLThumbnailsIcon>
        )}

        {buttons.showDownloadButton && (
          <SRLDownloadIcon
            buttonsBackgroundColor={buttons.backgroundColor}
            buttonsIconColor={buttons.iconColor}
            buttonsSize={buttons.size}
            buttonsIconPadding={buttons.iconPadding}
            title="Download image"
            className="SRLDownloadButton"
            onClick={handleImageDownload}
          >
            <div className="SRLDownloadButton">
              <svg
                className="SRLDownloadButton"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="11 11 30 30"
              >
                <path
                  className="SRLDownloadButton"
                  d="M35.7 34.1c0 .6-.5 1-1.1 1-.6 0-1.1-.5-1.1-1s.5-1 1.1-1c.6 0 1.1.5 1.1 1zm-4.6-1c-.6 0-1.1.5-1.1 1s.5 1 1.1 1c.6 0 1.1-.5 1.1-1s-.5-1-1.1-1zm7.8-2.5V36c0 1.3-1.1 2.3-2.4 2.3h-23c-1.3 0-2.4-1-2.4-2.3v-5.4c0-1.3 1.1-2.3 2.4-2.3h5.4l-3.1-2.9c-1.4-1.3-.4-3.5 1.5-3.5h2.9v-8.1c0-1.1 1-2.1 2.2-2.1h5.2c1.2 0 2.2.9 2.2 2.1v8.1h2.9c1.9 0 2.9 2.2 1.5 3.5l-3.1 2.9h5.4c1.3 0 2.4 1 2.4 2.3zm-14.2.9c.2.2.4.2.6 0l7.6-7.3c.3-.3.1-.7-.3-.7H28v-9.7c0-.2-.2-.4-.4-.4h-5.2c-.2 0-.4.2-.4.4v9.7h-4.6c-.4 0-.6.4-.3.7l7.6 7.3zm12.5-.9c0-.3-.3-.6-.7-.6h-7.1l-2.8 2.7c-.8.8-2.2.8-3.1 0L20.6 30h-7.1c-.4 0-.7.3-.7.6V36c0 .3.3.6.7.6h23c.4 0 .7-.3.7-.6v-5.4z"
                />
              </svg>
            </div>
          </SRLDownloadIcon>
        )}

        {panzoomEnabled ? (
          <SRLZoomOutIcon
            buttonsBackgroundColor={buttons.backgroundColor}
            buttonsIconColor={buttons.iconColor}
            buttonsSize={buttons.size}
            buttonsIconPadding={buttons.iconPadding}
            title="Zoom out"
            className="SRLZoomOutButton"
            onClick={() => handlePanzoom(false)}
          >
            <div className="SRLZoomOutButton">
              <svg
                className="SRLZoomOutButton"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="11 11 30 30"
              >
                <path
                  className="SRLZoomOutButton"
                  d="M27.9 21.6v1.3c0 .4-.3.7-.7.7h-10c-.4 0-.7-.3-.7-.7v-1.3c0-.4.3-.7.7-.7h10c.4 0 .7.3.7.7zm10.7 15.8l-1.2 1.2c-.3.3-.7.3-.9 0L29.9 32c-.1-.1-.2-.3-.2-.5v-.7c-2 1.7-4.6 2.8-7.4 2.8C16 33.6 11 28.5 11 22.3s5-11.4 11.3-11.4S33.6 16 33.6 22.3c0 2.8-1 5.4-2.8 7.4h.7c.2 0 .3.1.5.2l6.6 6.6c.3.2.3.6 0 .9zM31 22.3c0-4.8-3.9-8.7-8.7-8.7s-8.7 3.9-8.7 8.7 3.9 8.7 8.7 8.7 8.7-3.9 8.7-8.7z"
                />
              </svg>
            </div>
          </SRLZoomOutIcon>
        ) : (
          ''
        )}
        {buttons.showFullscreenButton && (
          <SRLExpandIcon
            buttonsBackgroundColor={buttons.backgroundColor}
            buttonsIconColor={buttons.iconColor}
            buttonsSize={buttons.size}
            buttonsIconPadding={buttons.iconPadding}
            title="Enter fullscreen"
            className="SRLExpandButton"
            onClick={handleFullScreen}
          >
            <div className="SRLExpandButton">
              <svg
                className="SRLExpandButton"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="11 11 30 30"
              >
                <path
                  className="SRLExpandButton"
                  d="M11.22 20.66v-7.91a1.52 1.52 0 011.53-1.53h7.91a.76.76 0 01.76.76v1.53a.77.77 0 01-.76.77h-6.38v6.38a.77.77 0 01-.77.76H12a.76.76 0 01-.78-.76zM29.58 12v1.53a.78.78 0 00.77.77h6.38v6.38a.76.76 0 00.76.76H39a.77.77 0 00.77-.76v-7.93a1.52 1.52 0 00-1.53-1.53h-7.89a.77.77 0 00-.77.78zM39 29.58h-1.51a.77.77 0 00-.76.77v6.38h-6.38a.77.77 0 00-.77.76V39a.78.78 0 00.77.77h7.91a1.52 1.52 0 001.53-1.53v-7.89a.78.78 0 00-.79-.77zM21.42 39v-1.51a.76.76 0 00-.76-.76h-6.38v-6.38a.78.78 0 00-.77-.77H12a.77.77 0 00-.76.77v7.91a1.52 1.52 0 001.53 1.53h7.91a.77.77 0 00.74-.79z"
                />
              </svg>
            </div>
          </SRLExpandIcon>
        )}

        {buttons.showCloseButton && (
          <SRLCloseIcon
            buttonsBackgroundColor={buttons.backgroundColor}
            buttonsIconColor={buttons.iconColor}
            buttonsSize={buttons.size}
            buttonsIconPadding={buttons.iconPadding}
            title="Close"
            className="SRLCloseButton"
            onClick={() => handleCloseLightbox()}
          >
            <div className="SRLCloseButton">
              <svg
                className="SRLCloseButton"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="11 11 30 30"
              >
                <path
                  className="SRLCloseButton"
                  d="M27.92 25l8.84-8.84 1.82-1.82c.27-.27.27-.71 0-.97l-1.95-1.95a.682.682 0 0 0-.97 0L25 22.08 14.34 11.42a.682.682 0 0 0-.97 0l-1.95 1.95c-.27.27-.27.71 0 .97L22.08 25 11.42 35.66c-.27.27-.27.71 0 .97l1.95 1.95c.27.27.71.27.97 0L25 27.92l8.84 8.84 1.82 1.82c.27.27.71.27.97 0l1.95-1.95c.27-.27.27-.71 0-.97L27.92 25z"
                />
              </svg>
            </div>
          </SRLCloseIcon>
        )}
      </SRLTopButtons>

      {buttons.showNextButton && (
        <SRLNextIcon
          buttonsBackgroundColor={buttons.backgroundColor}
          buttonsIconColor={buttons.iconColor}
          buttonsSize={buttons.size}
          buttonsIconPadding={buttons.iconPadding}
          thumbnailsPosition={thumbnailsPosition}
          thumbnailsDivSizes={thumbnailsDivSizes}
          hideThumbnails={hideThumbnails}
          title="Next"
          className="SRLNextButton"
          onClick={() => handleNextElement(currentElementID)}
        >
          <div className="SRLNextButton">
            <svg
              className="SRLNextButton"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="11 11 30 30"
            >
              <path
                className="SRLPrevButton"
                d="M24.53 11.36l-.44.44c-.29.29-.29.76 0 1.05l11.09 11.09H11.83c-.41 0-.75.33-.75.75v.62c0 .41.33.75.75.75h23.35L24.09 37.14c-.29.29-.29.76 0 1.05l.44.44c.29.29.76.29 1.05 0l13.11-13.11c.29-.29.29-.76 0-1.05l-13.1-13.11a.754.754 0 0 0-1.06 0z"
              />
            </svg>
          </div>
        </SRLNextIcon>
      )}

      {buttons.showPrevButton && (
        <SRLPrevIcon
          buttonsBackgroundColor={buttons.backgroundColor}
          buttonsIconColor={buttons.iconColor}
          buttonsSize={buttons.size}
          buttonsIconPadding={buttons.iconPadding}
          title="Previous"
          className="SRLPrevButton"
          thumbnailsPosition={thumbnailsPosition}
          thumbnailsDivSizes={thumbnailsDivSizes}
          hideThumbnails={hideThumbnails}
          onClick={() => handlePrevElement(currentElementID)}
        >
          <div className="SRLPrevButton">
            <svg
              className="SRLPrevButton"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="11 11 30 30"
            >
              <path
                className="SRLPrevButton"
                d="M25.47 38.64l.44-.44c.29-.29.29-.76 0-1.05L14.82 26.06h23.35c.41 0 .75-.33.75-.75v-.62c0-.41-.33-.75-.75-.75H14.82l11.09-11.09c.29-.29.29-.76 0-1.05l-.44-.44a.742.742 0 0 0-1.05 0L11.31 24.47c-.29.29-.29.76 0 1.05l13.11 13.11c.29.3.76.3 1.05.01z"
              />
            </svg>
          </div>
        </SRLPrevIcon>
      )}
    </div>
  )
}

export default SRLLightboxControls

SRLLightboxControls.propTypes = {
  autoplay: PropTypes.bool,
  buttons: PropTypes.shape({
    backgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    iconPadding: PropTypes.string,
    showAutoplayButton: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    showDownloadButton: PropTypes.bool,
    showFullscreenButton: PropTypes.bool,
    showNextButton: PropTypes.bool,
    showPrevButton: PropTypes.bool,
    showThumbnailsButton: PropTypes.bool,
    size: PropTypes.string
  }),
  hideThumbnails: PropTypes.bool,
  buttonsOffsetFromProgressBar: PropTypes.string,
  currentElementID: PropTypes.string,
  handleCloseLightbox: PropTypes.func,
  handleFullScreen: PropTypes.func,
  handleImageDownload: PropTypes.func,
  handleNextElement: PropTypes.func,
  handlePanzoom: PropTypes.func,
  handlePrevElement: PropTypes.func,
  handleThumbnails: PropTypes.func,
  panzoomEnabled: PropTypes.bool,
  setAutoplay: PropTypes.func,
  settings: PropTypes.shape({
    autoplaySpeed: PropTypes.number
  }),
  showProgressBar: PropTypes.bool,
  showThumbnails: PropTypes.bool,
  thumbnailsPosition: PropTypes.string,
  SRLThumbnailsRef: PropTypes.object,
  thumbnailsSize: PropTypes.array
}
