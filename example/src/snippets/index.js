export const snippets = {
  plain: `
    // App.js
    import SimpleReactLightbox from 'simple-react-lightbox'

    <SimpleReactLightbox>
      <MyApp />
    </SimpleReactLightbox>

    // Any Component
    import { SRLWrapper } from 'simple-react-lightbox'

    <SrlWrapper>
      <img src="./path/or/url/to/your/image.jpg" alt="Caption" />
      <img src="./path/or/url/to/your/image.png" alt="Another Caption" />
      <img src="./path/or/url/to/your/image.png" alt="Final Caption" />
    </SrlWrapper>
  `,
  withOptions: `
    const options = {
      overlayColor: 'rgb(25, 136, 124)',
      transitionTimingFunction: 'ease-in-out',
      slideTransitionSpeed: 1000,
      buttonsIconPadding: '2px',
      buttonsIconColor: 'rgba(25, 136, 124, 0.5)',
      enablePanzoom: false,
      hideControlsAfter: 0
    }

    <SrlWrapper options={options}>
      <h1>Hello World</h1>
      <img src="./path/or/url/to/your/image.jpg" alt="Caption" />
      <img src="./path/or/url/to/your/image.png" alt="Another Caption" />
      <p>I am some text, but I will be ignored by the light-box</p>
      <img src="./path/or/url/to/your/image.png" alt="Final Caption" />
    </SrlWrapper>

    `,
  withDataAttribute: `
      <SRLWrapper>
        <a href="link/to/the/full/width/image.jpg" data-attribute="SRL">
          <img src="src/for/the/thumbnail/image.jpg" alt="Umbrella" />
        </a>
        <a href="link/to/the/full/width/image_two.jpg" data-attribute="SRL">
          <img src="src/for/the/thumbnail/image_two.jpg" alt="Umbrella" />
        </a>
      </SRLWrapper>
    `,
  withHook: `
    import { useLightbox } from 'simple-react-lightbox'

    const YourComponent = props => {

      // Custom Hook
      const openLightbox = useLightbox()

      return (
        <>
          <button onClick={() => openLightbox()}>
            Open the lightbox
          </button>
          <button onClick={() => openLightbox(props.index)}>
            Open the lightbox at index
          </button>
        </>
      )
    }
  `,
  withCallbacks: `

    // Define the callbacks
    const callbacks = {
      onSlideChange: args => yourFunction(args)
    }

    // Passes down the callbacks
    <SrlWrapper callbacks={callbacks}>
      <img src="./path/or/url/to/your/image.jpg" alt="Caption" />
      <img src="./path/or/url/to/your/image.png" alt="Another Caption" />
    </SrlWrapper>
  `
}
