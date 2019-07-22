# simple-react-lightbox (SRL)

![Simple React Lightbox - Logo](https://www.michelec.site/app/uploads/SRL/SRL_LogoGit.jpg)

[![NPM](https://img.shields.io/npm/v/simple-react-lightbox.svg)](https://www.npmjs.com/package/simple-react-lightbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.com/michelecocuccio/simple-react-lightbox.svg?token=RytKLBgaYszcR25z6ZLP&branch=master)](https://travis-ci.com/michelecocuccio/simple-react-lightbox)

#### A brief introduction 🧐

It all started when I was working on one of my project using React. The client had a blog page and he wanted to add a light-box to the images in the blog posts. The problem is that the data was fetched from the backend I had no control over the content of each post (the content was written in a WYSIWYG editor by the way).

I checked online for some light-box for React but I had to declare the images beforehand in either an array, an object etc...but what if you don't know about the content and you just want to add a light-box to the images? 😞

#### My Idea 💡

**Simple React Lightbox** gives you the ability to add a light-box functionality on a set of images, wether you define them yourself or you get them from an external source (API, backend etc…). Just use the provided component to wrap your app and then use the "SRLWrapper" component by wrapping it around the content in which you have your images (or just the images). 😮

🆕 From version 1.3 you can create a gallery with links and images as thumbnail. This will give you full control if you want a custom gallery. Check how it works in the

#### Packed with features 📦

**Simple React Lightbox** comes with many features: please check the [options](#options) section to learn more.

![Simple React Lightbox - Features](https://www.michelec.site/app/uploads/SRL/SRL_Icons.jpg)
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

Next you want to import and use the SRLWrapper component wherever expect the content with the images on which you want to add the light-box functionality. Please note the `{}` as this is a named export. _The caption for the images will be generated from the [image alt tag](https://www.w3schools.com/tags/tag_img.asp)!_

```jsx
import React from "react";
import { SRLWrapper } from "simple-react-lightbox"; // Import SRLWrapper

function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper>
        // This will be your content with the images. It can be anything.
        Content defined by yourself, content fetchted from an API, data from a
        graphQL query... anything :)
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

That's it 🥳 As we are not passing any [options](#options) you should have a working light-box with the default options like the image below:

![Simple React Lightbox - Default options](https://www.michelec.site/app/uploads/SRL/SRL_DefaultLightbox.jpg)

###### The light-box with the default options

#### 🆕 Custom gallery

Due to popular demanding I have now added the option to use the light box in a more traditional way. If you want to create a gallery in which thumbnails are wrapped in a link that points to the full width image, now you can.

Simply wrap your images (ideally the thumbnails) in a link with the **`data-attribute="SRL"`**. As usual, the "alt" tag for the images will be used as caption if defined.

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
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

#### Options

I know what you are thinking.

> "That's cool and all but the style of the light-box dosen't match the one of my project. That's ok though. I will use your classes and override things with my custom styles..."

⚠️ **WAIT!** ⚠️ Despite the fact that I have made sure to define class names for each part of the light-box, I have provided all the options that you need to customize the light-box so that you don't have to add any additional logic. **You can customize everything!**
Check the options below.

| Option          | Type    | Default                                                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| overlayColor    | string  | rgba(0, 0, 0, 0.9)                                                                                                                                                | Sets the background color of he light-box. You can set an rgba() value if you want to control the opacity. Any CSS Color value is valid.                                                                                                                                                                                                                                                                                                                                                   |
| captionStyle    | object  | `captionStyle: { captionColor: "#FFFFFF", captionFontFamily: "inherit", captionFontSize: "inherit", captionFontWeight: "inherit", captionFontStyle: "inherit" },` | This is an object that defines the styles for the caption. You can control the color, size, font-family, weight and style of the font. Those values depends, of course, on the font that you are using. `captionFontStyle` is just the CSS property `text-transform` (none/capitalize/uppercase/lowercase/initial/inherit).                                                                                                                                                                |
| buttonsStyle    | object  | `buttonsStyle: { buttonsBackgroundColor: "rgb(30,30,36,0.8)", buttonsIconColor: "rgba(255, 255, 255, 0.8)"}`,                                                     | This is an object that defines the style for the buttons and the icon inside the button. So you can control both of them easily. Any CSS Color value is valid **but there is some magic 🎩 happening in here**: if you use an rgba() value for the icon and set an opacity (like "0.8" as showed in the default value), when you hover with the mouse on the icon this will create a nice CSS hover effect by automatically changing the opacity to "1", regardless the colour you choose. |
| autoplaySpeed   | number  | 3000                                                                                                                                                              | Controls the auto play change interval. **Set it to 0** if you don't want to use the auto play functionallity and you want to hide the button.                                                                                                                                                                                                                                                                                                                                             |
| transitionSpeed | number  | 600                                                                                                                                                               | Controls the transition speed of when an image is swapped with another. **Be gentle** as using a really high value can potentially cause issues.                                                                                                                                                                                                                                                                                                                                           |
| showCaption     | boolean | true                                                                                                                                                              | Shows/hides the caption. _The caption of the images is generated from the [image alt tag](https://www.w3schools.com/tags/tag_img.asp)!_                                                                                                                                                                                                                                                                                                                                                    |
| showThumbnails  | boolean | true                                                                                                                                                              | Shows/hides the thumbnail gallery.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Yes, options! But how do I use them?

Passing options is as simple as defining props for a React component. Actually, the options **are** props for the SimpleReactLightbox component. I will strongely reccomend to create a constant with all the options and then [spread it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) in the component. Is fast, readable and easy to change. Thanks ES6 😎

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
// Import Simple React Lightbox
import SimpleReactLightbox from "simple-react-lightbox";

// Create an object with the options that we want to use
const options = {
  overlayColor: "rgb(25, 136, 124)",
  captionStyle: {
    captionColor: "#a6cfa5",
    captionFontFamily: "Raleway, sans-serif",
    captionFontSize: "22px",
    captionFontWeight: "300",
    captionFontStyle: "capitalize"
  },
  buttonsStyle: {
    buttonsBackgroundColor: "#1b5245",
    buttonsIconColor: "rgba(126, 172, 139, 0.8)"
  },
  autoplaySpeed: 1500,
  transitionSpeed: 900,
};

function App() {
  return (
    <div className="App">
      /* Using the spread operator, we spread the options.
      You could also define the options one by one like
     <SimpleReactLightbox overlayColor={"rgba(255,255,255,0.9)"} captionStyle={{captionColor: "red"}}
     But...why?
     */
     <SimpleReactLightbox {...options}>
        <MyComponent /> // Your App logic
      </SimpleReactLightbox>
    </div>
  );
}

export default App;
```

![Simple React Lightbox - Default options](https://www.michelec.site/app/uploads/SRL/SRL_LightboxWithOptions.jpg)

###### The light-box with the custom options

#### High Order Component

⚠️ **_Please note this feature might be removed in the future_** ⚠️
Sometimes you may have a lot of images and yes, the user could open the light-box clicking on the first one. But every website is designed differently and UI / UX play a big part when designing and coding a website. So I created a HOC _[High Order Component](https://reactjs.org/docs/higher-order-components.html)_ that you can use to get access to two methods:

| Method        | Description                                        |
| ------------- | -------------------------------------------------- |
| openLightbox  | Opens the light-box starting from the first image. |
| closeLightbox | Closes the light-box.                              |

and this is how you use the High Order Component

```jsx
import React from "react";
// Import the High Order Component
import { withSRLContext } from "simple-react-lightbox";

const MyComponent = props => {
  // We have access to the methods inside the props
  <div>
    <button onClick={props.openLightbox}>Open lightbox</button>
    <a onClick={props.closeLightbox}>Close lightbox</a>
  </div>
}

// Wrap your component with the High Order Component
export withSRLContext(MyComponent);
```

To be honest I don't really see a reason to use that, especially the "closeLightbox" method so I might consider to remove this in the near future.

## Example project

There is a an example project that you can run. Just download this repository and `cd` in to the directory "example" and to the following:

```bash
npm install
npm run start
```

or with Yarn

```bash
yarn
yarn start
```

The example project is useful as you can test the functionallity and how **Simple React Lightbox** works. The example project will be constantly updated with the release of new features. As for now it demonstrates how you can have two different pages using **Simple React Lightbox**. It also demonstrate how to use the the [High Order Component](#high-order-component) in case you want to open/close the light-box from an external button.

## Caveats 👮

The images will have an `id` tag assigned by **Simple React Lightbox**. Any other `id` tag on the image will be removed. If you are using `id` tag in the images, I suggest you use a `class` instead. I don't think `id` tag on images are used a lot but if this is the case let me know and I might adjust the code in the future.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                           |

## What the future holds 🔮

- I know that usually the way people implements an image gallery is by setting a div with a background image and then wrap the `div` in a `a` tag to do something with the image. Or maybe they just use a thumbnail and link to the full image. Unfortunately in this case, **Simple React Lightbox** is not going to work as it scans for actual `img` and not links. I might consider to create a separated option in the future to allow this behaviour.
- Use TypeScript
