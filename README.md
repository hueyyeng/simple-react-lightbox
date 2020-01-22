# Simple React Light-box (SRL)

![Simple React Light-box - Logo](https://www.simple-react-lightbox.dev/images/SRL_Logo_Git.jpeg?)

[![NPM](https://img.shields.io/npm/v/simple-react-lightbox.svg)](https://www.npmjs.com/package/simple-react-lightbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.com/michelecocuccio/simple-react-lightbox.svg?token=RytKLBgaYszcR25z6ZLP&branch=master)](https://travis-ci.com/michelecocuccio/simple-react-lightbox)

### What's new in Version 2.0
A lot has changed, but the core functionality remains the same.
- Improved and optimised code
- Each light-box is now individually configurable and can now have different styles and options! 🥳
- Added validation for the images (If you have a broken image it will be ignored and won't trigger the light-box)
- Added "pan & zoom"* functionality and an option to disable it [PanZoom Functionality](#panzoom-functionality)
- Added an option to open the image in full-screen
- Added an option to control the size of the buttons
- Added an option to control the opacity of the thumbnails
- Added an option to control the speed of the transition and the easing of the light-box when opened
- Added an option to hide the controls after a certain amount of time

### Migrating from Version 1.0
Nothing has changed, you will only see your light-box with the default options. That's because the options have now changed. Don't pass the options to the ```<SimpleReactLightbox/>``` component. Just pass the [options](#options) to the ```<SRLWrapper>```

#### A brief introduction 🧐

It all started when I was working on one of my project using React. The client had a blog page and he wanted to add a light-box to the images in the blog posts. The problem is that the data was fetched from the backend and I had no control over the content of each post (the content was in a WYSIWYG editor).

I checked online for some light-box for React but the way that they were working was that I had to declare the images beforehand in either an array, an object etc...but what if you don't know about the content and you just want to add a light-box to the images? 😞

#### My Idea 💡

**Simple React Lightbox** gives you the ability to add a light-box functionality on a set of images, whether you define them yourself or you get them from an external source (API, backend etc…). Just use the provided component to wrap your app, define your options and then use the "SRLWrapper" component by wrapping it around the content in which you have or expect your images 😮!

From version 1.3 you can create a gallery with links and images as thumbnail. This will give you full control if you want a custom gallery. Check how it works in the "Gallery with links" example page on the CodeSandbox [demo](#demo)

#### Packed with features 📦

**Simple React Lightbox** comes with many features: please check the [options](#options) section to learn more.

![Simple React Lightbox - Features](https://www.simple-react-lightbox.dev/images/SRL_Icons_Git.jpeg?)
<br/>

---

## Install

```bash
npm install --save simple-react-lightbox
```

or with Yarn

```bash
yarn add simple-react-lightbox
```

## How to use

#### Demo

I have provided a working demo on Codesandbox where you can also play with the options and see the light-box in action. This is the same as running the demo locally.

[![Edit Simple-React-Lightbox§](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/simple-react-lightboxss-39wrb?fontsize=10)

#### Instructions

First of all you need to wrap your React app with the main component so that it can create the context. The example below will allow you to use the **Simple React Lightbox** wherever you need it in your app:

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
import SimpleReactLightbox from "simple-react-lightbox"; // Import Simple React Lightbox

function App() {
  return (
    <div className="App">
      <SimpleReactLightbox>
        <MyComponent /> // Your App logic
      </SimpleReactLightbox>
    </div>
  );
}

export default App;
```

Next you want to import and use the **SRLWrapper** component wherever you expect the content with the images on which you want to add the light-box functionality. Please note the `{}` as this is a named export. _The caption for the images will be generated from the [image "alt" attribute](https://www.w3schools.com/tags/tag_img.asp)!_

```jsx
import { SRLWrapper } from "simple-react-lightbox"; // Import SRLWrapper

function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper>
        // This will be your content with the images. It can be anything.
        Content defined by yourself, content fetched from an API, data from a
        graphQL query... anything :)
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

That's it 🥳 As we are not passing any [options](#options) you should have a working light-box with the default options like the image below:

![Simple React Lightbox - Default options](https://www.simple-react-lightbox.dev/images/SRL_Example1_Git.jpeg)

###### The light-box with the default options

#### Using it with Gatbsy
If you want to use it with Gatbsy, make sure to check the [wrapRootElement api](https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement) from Gatsby documentation.
Just edit the "gatsby-browser.js" and "gatsby-ssr.js" file to wrap everything with the SimpleReactLightbox component.

```jsx
import React from "react"
import SimpleReactLightbox from "simple-react-lightbox"

export const wrapRootElement = ({ element }) => {
  return <SimpleReactLightbox>{element}</SimpleReactLightbox>
}
```

#### Custom gallery

If you want to use the light-box in a more traditional way, like if you want to create a gallery in which thumbnails are wrapped in a link that points to a full width image, now you can. (You can check the "Gallery with links" example page on the CodeSandbox [demo](#demo)).

Simply wrap your images (ideally the thumbnails) in a link with the **`data-attribute="SRL"`**. As usual, the `alt` attribute for the images will be used as caption if declared.

```jsx
import React from "react";
import { SRLWrapper } from "simple-react-lightbox"; // Import SRLWrapper

function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper>
        <a href="link/to/the/full/width/image.jpg" data-attribute="SRL">
          <img src="src/for/the/thumbnail/image.jpg" alt="Umbrella" />
        </a>
        <a href="link/to/the/full/width/image_two.jpg" data-attribute="SRL">
          <img src="src/for/the/thumbnail/image_two.jpg" alt="Umbrella" />
        </a>
        // More images...
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

#### Options
I know what you are thinking.

> "That's cool and all but the style of the light-box doesn't match the one of my project. That's ok though. I will use your classes and override everything with my custom styles..."

⚠️ **WAIT!** ⚠️ Despite the fact that I have made sure to define class names for each part of the light-box, I have provided all the options that you need to customize the light-box so that you don't have to add any additional logic. **You can customize everything!**
Check the options below.

| Option | Type | Default | Description |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| autoplaySpeed   | number  | 3000 | Controls the auto play change interval. **Set it to 0** if you don't want to use the auto play functionality and hide the button. |
| buttonIconPadding | string  | '0px ' | Increases the padding between the icon and the sides of the button. The more padding you add the smaller the icon will look.
| buttonsBackgroundColor | string  | 'rgba(0, 0, 0, 0.9)'  | Controls the background color of the buttons.  Any CSS Color value is valid.
| buttonsIconColor | string  | 'rgba(255, 255, 255, 0.8)' | Controls the color of the icons inside the buttons.  Any CSS Color value is valid but there is some magic 🎩 happening in here: if you use an rgba() value set an opacity (like “0.8” as showed in the default value), when you hover with the mouse on the icon this will create a nice CSS hover effect by automatically changing the opacity to “1”, regardless the colour you choose.
| buttonsSize | string | '40px' | Controls the size of the buttons.
| captionFontFamily | string | 'inherit' | Controls the font family of the caption.
| captionFontSize | string | 'inherit' | Controls the font size of the caption.
| captionFontStyle | string | 'inherit' | Controls the font style of the caption. (This is just the CSS property text-transform (none/capitalize/uppercase/lowercase/initial/inherit))
| captionFontWeight | string | 'inherit' | Controls the font weight of the caption.
| enablePanzoom | boolean | true | Enables or disables the pan-zoom on the image. If you are having issues with the pan-zoom you can disable it from this option.
| hideControlsAfter | number | 3000 | Controls after how long it will takes for the controls and thumbnails to be hidden. By default all the controls and the thumbnails will be hidden after 3 seconds, to create a more immersive experience. If you want the controls and thumbnails to be always visible **set this to 0**. | overlayColor | string | 'rgba(0, 0, 0, 0.9)' | The background color for the light-box.
| showCaption | boolean | true | Shows/hides the caption. _The caption of the images is generated from the [image "alt" attribute](https://www.w3schools.com/tags/tag_img.asp)!_
| showThumbnails | boolean | true | Shows/hides the thumbnail gallery.
| slideTransitionSpeed | number | 600 | Controls the transition speed of when an image is swapped with another. **Be gentle** as using a really high value can potentially cause issues. This value is in millisecond.
| thumbnailsOpacity | number | 0.4 | Controls the opacity of the thumbnails.
| transitionSpeed | number | 600 | Controls the transition speed of when the light-box is opened. This value is in millisecond.
| transitionTimingFunction | string | 'ease' | Controls the transition timing function of when the light-box is opened. It supports all the value of the [css transition-timing-function options.](https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp)  |

#### Yes, options! But how do I use them?

Passing options is as simple as defining props for a React component. Actually, the options **are** props for the SRLWrapper component. I will strongly recommend to create a constant with all the options and then [spread it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) in the component. Is fast, readable and easy to change. Thanks ES6 😎
Remember that you can have as many light-box as you want. Just import the SRLWrapper and use it to wrap your images.

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
// Import SRLWrapper
import {SRLWrapper} from "simple-react-lightbox";

// Create an object with the options that we want to use
const options = {
  overlayColor: "rgb(25, 136, 124)",
  captionColor: "#a6cfa5",
  captionFontFamily: "Raleway, sans-serif",
  captionFontSize: "22px",
  captionFontWeight: "300",
  captionFontStyle: "capitalize",
  buttonsBackgroundColor: "#1b5245",
  buttonsIconColor: "rgba(126, 172, 139, 0.8)",
  autoplaySpeed: 1500,
  transitionSpeed: 900,
};

function MyComponent() {
  return (
    <div className="MyComponent">
      /* Using the spread operator, we spread the options. */
     <SRLWrapper {...options}>
        // Your images here
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

![Simple React Lightbox - Default options](https://www.simple-react-lightbox.dev/images/SRL_Example2_Git.jpeg)

###### The light-box with the custom options

#### High Order Component

⚠️ **_Please note this feature might be removed in the future_** ⚠️
Sometimes you may have a lot of images and yes, the user could open the light-box by clicking on the first one. But every website is designed differently and UI / UX play a big part when designing and coding a website. So I created a HOC _[High Order Component](https://reactjs.org/docs/higher-order-components.html)_ that you can use to get access to two methods:

| Method        | Description                                        |
| ------------- | -------------------------------------------------- |
| openLightbox  | Opens the light-box starting from the first image. |

and this is how you use the High Order Component

```jsx
import React from "react";
// Import the High Order Component
import { withSRLContext } from "simple-react-lightbox";

const MyComponent = props => {
  // We have access to the methods inside the props
  <div>
    <button onClick={props.openLightbox}>Open lightbox</button>
  </div>
}

// Wrap your component with the High Order Component
export withSRLContext(MyComponent);
```

To be honest I don't really see a reason to use that so I might consider to remove this in the near future.

## PanZoom functionality
I added this feature as I think is really cool but is not 100% perfect yet. So in case you have issues with it, just disable it from the [options](#options).

## Caveats 👮

The images will have an `id` attribute assigned by **Simple React Lightbox**. Any other `id` attribute on the image will be removed. If you are using `id` attribute in the images, I suggest you use a `class` attribute instead. I don't think `id` attribute on images are used a lot but if this is the case let me know and I might adjust the code in the future.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                           |

## What the future holds 🔮

- Use TypeScript
