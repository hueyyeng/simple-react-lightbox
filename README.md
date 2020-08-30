# Simple React Light-box (SRL)

![Simple React Light-box - Logo](https://simple-react-lightbox.dev/docs/SRL_Logo_Git.jpeg?)

[![NPM](https://img.shields.io/npm/v/simple-react-lightbox.svg)](https://www.npmjs.com/package/simple-react-lightbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.com/michelecocuccio/simple-react-lightbox.svg?token=RytKLBgaYszcR25z6ZLP&branch=master)](https://travis-ci.com/michelecocuccio/simple-react-lightbox)

[![paypal](https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=846H2KJ6AUL48)

[![buymeacoffe](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/michelecocuccio)


### Documentation: quick links

- [A brief introduction](#a-brief-introduction)
- [Demo on CodeSandbox](#demo)
- [Get started](#how-to-use)
- [Options](#options)
- [Custom Captions](#custom-captions) 🆕
- [Callbacks](#callbacks)
- [Custom Hook](#hooks)
- [A note on "slide" animation and Firefox](#firefox-issue)


### August updates and bugfixes (v3.3)
- **[Translations](#translations-options) has been added to the list of options**. Now you can change the title of the buttons with the text that you want and you can translate it to your preferred language.

- **Full screen mode has been improved**. Now you can use the interface of Simple React Lightbox while being on full screen.

- Fixed a bug that was causing the image to shake when panning and zooming on IOS.

- Fixed a bug that was causing the thumbnails to wrongly position themself on IOS.

- Fixed a bug that was causing the light-box to be unable to recognize the source of the image when using Gatsby image with the "Gallery with thumbnails" mode.

- Fixed a bug where the pan zoomed image was repositioning itself due to a wrong re-render of the component when the thumbnails were hidden.

- Added an improvement to the "Gallery with thumbnails" mode where if the light-box is not loaded will prevent the link to be clicked and therfore to open the image in the browser.

- Added a folder in the repository called "example-with-gatsby" which shows how to correctly use the light-box with Gatsby when using gatsby-images


## A brief introduction
It all started when I was working on one of my project using React. The client had a blog page and he wanted to add a light-box to the images in the blog posts. The problem is that the data was fetched from the backend and I had no control over the content of each post (the content was coming from a WYSIWYG editor).

I checked online for some light-box for React but the way that they were working was that I had to declare the images beforehand in either an array, an object etc...but what if you don't know about the content and you just want to add a light-box to your images? 😞

**Simple React Lightbox** gives you the ability to add a light-box functionality on a set of images, whether you define them yourself or you get them from an external source (API, backend etc…). Just use the provided component to wrap your app, define your options and then use the `<SRLWrapper>`  component by wrapping it around the content in which you have or expect your images 😮!


#### Packed with features 📦

**Simple React Lightbox** comes with many features: please check the [options](#options) section to learn more.

![Simple React Lightbox - Features](https://simple-react-lightbox.dev/docs/SRL_Icons_Git.jpeg?)
<br/>

---

## Demo

I have provided a **full working demo** on CodeSandbox where you can also play with the options and see the light-box in action.

[![Edit Simple-React-Lightbox§](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/simple-react-lightboxss-39wrb?fontsize=10)

I have also created a **full working website** where you can see the light-box in action. If you want to play with the options, use the CodeSandbox link above.

[Simple React Lightbox - Website](https://simple-react-lightbox.dev)

## How to use


#### Install

```bash
npm install --save simple-react-lightbox
```

or with Yarn

```bash
yarn add simple-react-lightbox
```

#### STEP 1

First of all you need to **wrap your React app with the main component** so that it can create the context. The example below will allow you to use the **Simple React Lightbox** wherever you need it in your app:

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
// Import Simple React Lightbox
import SimpleReactLightbox from "simple-react-lightbox";

function App() {
  return (
    <div className="App">
      // Wrap your app with the component
      <SimpleReactLightbox>
        <MyComponent /> // Your App logic
      </SimpleReactLightbox>
    </div>
  );
}

export default App;
```

Note: *if you need multiple instances of the light-box in one page you should wrap each one in it's own  `<SimpleReactLightbox>` component.*

#### STEP 2

Next you want to import and use the `<SRLWrapper>` component wherever you expect the content with the images on which you want to add the light-box functionality. Please note the `{}` as this is a named export. The caption for the images will be generated from the [image "alt" attribute](https://www.w3schools.com/tags/tag_img.asp) so don't forget to add it.

```jsx
// Import SRLWrapper
import { SRLWrapper } from "simple-react-lightbox";

function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper>
        // This will be your content with the images. It can be anything. Content defined by yourself, content fetched from an API, data from a graphQL query... anything :)
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

#### Done! But there's a lot more...

That's it 🥳 You implemented your light-box! But you know that there are tons of [options](#options) that can be implemented? Check the options below.

![Simple React Lightbox - Default options](https://simple-react-lightbox.dev/docs/SRL_Example1_Git.jpeg)

###### The light-box with the default options


#### Custom gallery

If you want to use the light-box in a more traditional way, like if you want to create a gallery in which thumbnails are wrapped in a link that links to a full width image check the "Gallery with links" example page on the CodeSandbox [demo](#demo).

Simply wrap your images (ideally the thumbnails) in a link with the **`data-attribute="SRL"`**. As usual, the `alt` attribute for the images will be used as caption if declared.

```jsx
import React from "react";
// Import SRLWrapper
import { SRLWrapper } from "simple-react-lightbox";

function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper>
        <a href="link/to/the/full/width/image.jpg" data-attribute="SRL">
          <img src="src/for/the/thumbnail/image.jpg" alt="Umbrella" />
        </a>
        <a href="link/to/the/full/width/image_two.jpg" data-attribute="SRL">
          <img src="src/for/the/thumbnail/image_two.jpg" alt="Whatever" />
        </a>
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

#### Declaring images in an array

This approach is definitely supported, but it is discouraged. Please see the reason why Simple React Lightbox is different by reading [the section above](#a-brief-introduction) to learn more.

```jsx
import React from "react";
// Import SRLWrapper
import { SRLWrapper } from "simple-react-lightbox";

const images = [
  {
    src: 'https://www.simple-react-lightbox.dev/docs/gallery/unsplash18.jpg',
    thumbnail:
      'https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash18.jpg',
    caption: 'Lorem ipsum dolor sit amet',
    width: 1920,
    height: 'auto'
  },
  {
    src: 'https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg',
    thumbnail:
      'https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash19.jpg',
    caption: 'Consecutur adiscip elit',
    width: 2000,
    height: 'auto'
  },
]

function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper images={images}/>
    </div>
  );
}

export default MyComponent;
```

## Options
I know what you are thinking.

> "That's cool and all but the style of the light-box doesn't match the one of my project. That's ok though. I will use your classes and override everything with my custom styles..."

⚠️ **WAIT!** ⚠️ Despite the fact that I have made sure to define class names for each part of the light-box, I have provided all the options that you need to customize the light-box so that you don't have to add any additional logic. **You can customize everything!**

Passing options is very simple. Just pass the options in a prop called **options** to the `<SRLWrapper>` component. I will strongly recommend to create a constant with all the options and then pass it to the component. **From version 2.8, options are divided in four objects to avoid confusion and to make the code cleaner**

The four objects are: `settings`, `caption`, `buttons`, `thumbnails`.

```js
const options = {
  settings: {},
  caption: {},
  buttons: {},
  thumbnails: {},
  progressBar:{}
}
```

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
// Import SRLWrapper
import {SRLWrapper} from "simple-react-lightbox";

// Create an object with the options that you want to use. The options are divided in 4 main objects. You don't need to define them all.
const options = {
  settings: {
    overlayColor: "rgb(25, 136, 124)",
    autoplaySpeed: 1500,
    transitionSpeed: 900,
  },
  buttons: {
    backgroundColor: "#1b5245",
    iconColor: "rgba(126, 172, 139, 0.8)",
  },
  caption: {
    captionColor: "#a6cfa5",
    captionFontFamily: "Raleway, sans-serif",
    captionFontWeight: "300",
    captionTextTransform: "uppercase",
  }
};

function MyComponent() {
  return (
    <div className="MyComponent">
     // Simply pass the entire object in a prop called "options"
     <SRLWrapper options={options}>
        // Your images here
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

![Simple React Lightbox - Default options](https://simple-react-lightbox.dev/docs/SRL_Example3_Git.jpeg)
![Simple React Lightbox - Default options](https://simple-react-lightbox.dev/docs/SRL_Example4_Git.jpeg)
###### The light-box with the custom options

-----------------------------

#### Settings options

|  **Option** |  **Type** |  **Default value** | **Description**   |
| :------------ | :------------ | :------------ | :----------------- |
|  `autoplaySpeed` |  `number`  | 3000  | Controls the auto play change interval. Set it to 0 if you don't want to use the auto play functionality and hide the button. |
| `disableKeyboardControls`   | `boolean`   | `false`  | Disable keyboard controls. |
| `disableWheelControls`   | `boolean`   | `false`   | Disable mouse wheel controls.  |
| `disablePanzoom`   | `boolean`   | `false`  | Disable panzzom controls.  |
| `hideControlsAfter`  | `number` or `boolean`  |  3000  |  Controls how long it will takes for the controls and thumbnails to be hidden. By default all the controls and the thumbnails will be hidden after 3 seconds (3000ms), to create a more immersive experience. This value can't be less then 1000ms. If you want the controls and thumbnails to be always visible set this to FALSE. |
| `lightboxTransitionSpeed `   | `number`   | 0.6  | Controls the transition speed of when the light-box is opened.**This value is in seconds ⚠️**.  |
| `lightboxTransitionTimingFunction`   | `string`   | "linear"  | Controls the transition timing function of when the light-box is opened. Accepted values are *"linear", "easeIn","easeOut", "easeInOut","circIn", "circOut", "circInOut", "backIn", "backOut", "backInOut", "anticipate"*|
| `overlayColor` | `string` | "rgba(0, 0, 0, 0.9)"  | Controls the background color of the light-box. |
| `slideAnimationType`  🆕  | `string`  | 'fade'  | Set the type of animation. Possible values are "fade","slide","both". "Fade" is a simple fade in/out animation. "Slide" means that the image will slide left or right (depeding on the direction). This uses the spring physics animation so make sure you set the `slideSpringValues` as settings. "Both" means that the image will slide and fade. |
| ` slideSpringValues`  🆕  | `array` of `number`  | `[300, 200]`  | Simulates spring physics for realistic motion. The first value in the array is **damping** (Strength of opposing force. If set to 0, spring will oscillate indefinitely so don't do it). The second value is **stiffness** (Stiffness of the spring. Higher values will create more sudden movement).  |
| `slideTransitionSpeed`   | `number`  | 0.6  | Controls the transition speed of each image (when changing from an image to another). **This value is in seconds ⚠️**. This value is going to be ignored if you use the "slide" animation type and the `slideSpringValues` settings will be used instead|
| `slideTransitionTimingFunction`   | `string`   | "linear"  | Controls the transition timing function of each image (when changing from an image to another). Accepted values are *"linear", "easeIn","easeOut", "easeInOut","circIn", "circOut", "circInOut", "backIn", "backOut", "backInOut", "anticipate"* |

```js
const options = {
  settings: {
    autoplaySpeed: 3000,
    disableKeyboardControls: false,
    disablePanzoom: false,
    disableWheelControls: false,
    hideControlsAfter: 3000,
    lightboxTransitionSpeed: 0.6,
    lightboxTransitionTimingFunction: 'linear',
    overlayColor: 'rgba(0, 0, 0, 0.9)',
    slideAnimationType: 'fade',
    slideSpringValues: [300, 200],
    slideTransitionSpeed: 0.6,
    slideTransitionTimingFunction: 'linear'
  }
}
```

-----------------------

#### Buttons options


|  **Option** |  **Type** |  **Default value** | **Description**   |
| :------------ | :------------ | :------------ | :----------------- |
|  `backgroundColor` |  `string`  | "rgba(30,30,36,0.8)"  | Controls the background color of the buttons. Any CSS Color value is valid.   |
| `iconColor`  | `string`  |  "rgba(255, 255, 255, 0.8)"  |  Controls the color of the icons inside the buttons. Any CSS Color value is valid but there is some magic 🎩 happening in here: if you use an rgba() value and set an opacity (like “0.8” as showed in the default value), when you hover with the mouse on the icon this will create a nice CSS hover effect by automatically changing the opacity to “1”, regardless the colour you choose. |
| `iconPadding`   | `string`   | "5px"   | Increases the padding between the icon and the sides of the button. The more padding you add the smaller the icon will look.  |
| `showAutoplayButton`   | `string`   | `true`  | Show / Hide the autoplay button  |
| `showCloseButton`   | `string`   | `true`  | Show / Hide the close button  |
| `showDownloadButton`   | `string`   | `true`  | Show / Hide the download button  |
| `showFullscreenButton`   | `string`   | `true`  | Show / Hide the fullscreen button  |
| `showNextButton`   | `string`   | `true`  | Show / Hide the next button  |
| `showPrevButton`   | `string`   | `true`  | Show / Hide the previous button  |
| `showThumbnailsButton`   | `string`   | `true`  | Show / Hide the button to hide the thumbnails  |
| `size`   | `string`   | "40px"  | Controls the size of the buttons |


```js
const options = {
  buttons: {
    backgroundColor: 'rgba(30,30,36,0.8)',
    iconColor: 'rgba(255, 255, 255, 0.8)',
    iconPadding: '5px',
    showAutoplayButton: true,
    showCloseButton: true,
    showDownloadButton: true,
    showFullscreenButton: true,
    showNextButton: true,
    showPrevButton: true,
    showThumbnailsButton: true,
    size: '40px'
  }
}
```
-----------------------------------

#### Caption options


If you want to use [custom captions](#custom-captions) please read the documentation below.


|  **Option** |  **Type** |  **Default value** | **Description**   |
| :------------------ | :------------ | :------------ | :----------------- |
|  `captionAlignment` 🆕 |  `string`  | "start"  | Align the caption inside its div. Accepted values are *"start", "center", "end"* |
| `captionColor`  | `string`  |  "#FFFFFF"  |  Controls the color of the caption. |
| `captionContainerPadding` 🆕   | `string`  |  "0"  | Adds padding to the div containing the caption. You can use the CSS shortened syntax like "10px 5px" which will add 10px of padding top and bottom and 5px left and right. |
| `captionFontFamily`   | `string`   | "inherit"  | Controls the font family of the caption. By default it will inherit the one from the parent element. |
| `captionFontSize`   | `string`   | "inherit"  | Controls the font size of the caption. By default it will inherit the one from the parent element. |
| `captionFontStyle`   | `string`   | "inherit"  | Controls the font style of the caption. By default it will inherit the one from the parent element. |
| `captionFontWeight`   | `string`   | "inherit"  | Controls the font weight of the caption. By default it will inherit the one from the parent element. |
| `captionTextTransform`   | `string`   | "inherit"  | Controls the "text-transform" property of the caption. By default it will inherit the one from the parent element. |
|  `showCaption` |  `boolean`  | `true`  | Show / Hide the caption. |


```js
const options = {
  // Please note that "caption" is singular
  caption: {
    captionAlignment: 'start',
    captionColor: '#FFFFFF',
    captionContainerPadding: '0',
    captionFontFamily: 'inherit',
    captionFontSize: 'inherit',
    captionFontStyle: 'inherit',
    captionFontWeight: 'inherit',
    captionTextTransform: 'inherit',
    showCaption: true
  }
}
```

-----------------------

#### Thumbnails options

|  **Option** |  **Type** |  **Default value** | **Description**   |
| :------------ | :------------ | :------------ | :----------------- |
|  `showThumbnails` |  `boolean`  | `true`  | Show / Hide the thumbails. |
|  `thumbnailsAlignment` 🆕 |  `string`  | "center"  | Align the thumbnails in their div. Accepted values are *"start", "center", "end", "space-between", "space-around"* |
|  `thumbnailsContainerBackgroundColor` 🆕 |  `string`  | "transparent"  | Adds a background color to the div containing the thumbnails. |
|  `thumbnailsContainerPadding` 🆕 |  `string`  | "0"  | Adds padding to the div containing the thumbnails. You can use the CSS shortened syntax like "10px 5px" which will add 10px of padding top and bottom and 5px left and right. |
|  `thumbnailsGap` 🆕 |  `string`  | "0 1px"  | Gap between the thumbnails; |
| `thumbnailsOpacity`  | `number`  |  0.4  |  Controls the opacity of the thumbnails. |
| `thumbnailsPosition` 🆕 | `string`  | 'bottom' |  Controls where the thumbnails are going to be displayed. If displayed left and right, thumbnails will be stacked vertically. |
| `thumbnailsSize`   | `array` of `strings`   | `['100px', '80px']`  | Controls the size of the thumbnail. First value in the array is width and the second is height. |

```js
const options = {
  thumbnails: {
    showThumbnails: true,
    thumbnailsAlignment: 'center',
    thumbnailsContainerBackgroundColor: 'transparent',
    thumbnailsContainerPadding: '0',
    thumbnailsGap: '1px',
    thumbnailsOpacity: 0.4,
    thumbnailsPosition: 'bottom',
    thumbnailsSize: ['100px', '80px']
  }
}
```

-----------------------

#### Progress bar options

|  **Option** |  **Type** |  **Default value** | **Description**   |
| :------------ | :------------ | :------------ | :----------------- |
|  `backgroundColor` |  `string`  | "#f2f2f2"  | The background color of the progress bar. |
|  `fillColor` |  `string`  | "#000000"  | The fill color of the progess bar. |
|  `height` |  `string`  | "3px"  | The height of the progress bar. |
|  `showProgressBar` |  `boolean`  | `true`  | Show / Hide the progress bar. |


```js
const options = {
  progressBar: {
    backgroundColor: '#f2f2f2',
    fillColor: '#000000',
    height: '3px',
    showProgressBar: true
  }
}
```

-----------------------

#### Translations options

|  **Option** |  **Type** |  **Default value** | **Description**   |
| :------------ | :------------ | :------------ | :----------------- |
|  `autoplayText`  |  `string`  | "Play"  | The text for the play button when the light-box is not playing |
|  `closeText`  |  `string`  | "Close"  | The text for the close button |
|  `downloadText`  |  `string`  | "Download"  | The text for the download button |
|  `fullscreenText`  |  `string`  | "Full Screen"  | The text for the full screen button |
|  `nextText`  |  `string`  | "Next"  | The text for the next slide button |
|  `previousText`  |  `string`  | "Previous"  | The text for the previous slide button |
|  `pauseText`  |  `string`  | "Pause"  | The text for the play button when the light-box is playing |
|  `thumbnailsText`  |  `string`  | "Hide thumbnails"  | The text for the hide thumbnails button |
|  `zoomOutText`  |  `string`  | "Zoom out"  | The text for the zoom out button when the pan zoom is activate |


```js
const options = {
  translations: {
    autoplayText: 'Play',
    closeText: 'Close',
    downloadText: 'Download',
    fullscreenText: 'Full screen',
    nextText: 'Next',
    pauseText: 'Pause',
    previousText: 'Previous',
    thumbnailsText: 'Hide thumbnails',
    zoomOutText: 'Zoom Out'
  }
}
```

## Hooks
There are two hooks that you can use.
The first one is `openLightbox`. It opens the light-box and you can pass an argument which is the index of the slide you want to open (starting from 0).If you don't provide any argument to the function the light-box will just open it from the first image.
The second one is `closeLightbox` and you can use it to close the light-box.

Check the [demo](#demo) to see it in action. In the example below we are creating a **reusable** React component (a button) that can open the light-box from anywhere in your app. **Please note that from version 2.8 you need to destructure the useLightbox() hook to get the function that you need.**

```jsx
import React from 'react'
import { useLightbox } from 'simple-react-lightbox'

/*
You can use the provided hook in case you want
to open the lightbox from a button or anything :)
*/

const Button = props => {
  const { openLightbox } = useLightbox()

  return (
    <button
      onClick={() => openLightbox(props.imageToOpen)}
    >
      Open the lightbox
    </button>
  )
}

export default Button
```

## Custom Captions
If you want one or more image to have a fully customized caption, you can now do it by declaring an array of objects and passing it to the a prop on the `<SRLWrapper>` called `customCaptions`. Each object in the array has two values:
- `id` which is the image you want to add the custom caption to. **Remember that the id is starting from 0 so `id: 0` will target the first image, `id: 4` the fifth and so on...**
- `caption` this will contain your custom caption. You can use JSX/HTML markup and so you can have buttons, links and anything you like.

Check the example on the [demo website](https://simple-react-lightbox.dev/with-custom-captions/)

⚠️ NOTES:
- If you are using a button, or a link or anything you want clickable or selectable, **you need to add a class of `SRLCustomCaption` to every element, including children**. This is to prevent the light-box from closing when clicking outside which is the normal behavior of the light-box.
- All the settings about the caption are being ignored if you are using a custom caption. You dictate the style of your custom caption. Keep in mind that the caption was designed to be just that, a caption, and I am not responsible if your layout breaks for any reason (like if you put too many things in it).

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
// Import SRLWrapper
import {SRLWrapper} from "simple-react-lightbox";

const captionOne = <div myCustomCaptionOne">She found herself in a <span>forest...</span></div>

const captionTwo = <div myCustomCaptionTwo">...lost and wandering she had to <span>make a choice...</span></div>

const captionThree = <a href="http://www.simple-react-lightbox.dev" target="__blank" class="SRLCustomCaption myCustomButton">Help her make a choice</a>

// Create an object with the custom captions that you want to use
const customCaptions = [
  { id: 0, caption: captionOne },
  { id: 1, caption: captionTwo },
  { id: 2, caption: captionThree }
]

function MyComponent() {
  return (
    <div className="MyComponent">
     <SRLWrapper customCaptions={customCaptions}>
        // Your images here. Images 0,1,2 will use a custom caption.
      </SRLWrapper>
    </div>
  );
}

```


## Callbacks
Callbacks can be used in case you need to get information about the state of the light-box or to access the different slides (images). A good example of this could be if you, for example, wanted to sync a carousel with the light-box so that when you go through the images, your carousel is synced. (Check the example on the [demo website](https://simple-react-lightbox.dev/with-hook/) )

|  **Callback** |  **Args** | **Returns** | **Usage** | **Description**   |
| :------------ | :------------ | :------------ | :------------ | :----------------- |
|  `onSlideChange` |  `object` | `index: integer`, `action: string`, `slides: {previous: {}, current: {}, next: {}}` | `(object) => { console.log('object) }`  | Use this to detected when a slide changes. Gives back the current slide index, the action take (left, right or selected) and an object with the previous, current and next slide. |
|  `onLightboxOpened` |  `object` | `currentSlide: {...}, opened: true` | `(object) => { console.log('object) }`  | Use this to detected when the light-box is opened. It returns an object with the current slide and another one with a key of "opened" and a value of "true".  |
|  `onLightboxClosed` |  `object` | `currentSlide: {...}, opened: false` | `(object) => { console.log('object) }`  | Use this to detected when the light-box is closed. It returns an object with the current slide and another one with a key of "opened" value of "false".  |
|  `onCountSlides` |  `total` | `totalSlide: integer` | `(total) => { console.log('total) }`  | Use this to get the total of the slides. You can pass the total as an argument to your callback function and it will give back an integer with the total count of the slides/images on your light-box. |

#### Yes, callbacks! But how do I use them?
Callbacks are passed with the **callbacks** prop to the SRLWrapper.
I will strongly recommend to create a constant with all of your callbacks and then pass it to the component with the prop **callbacks**.

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
// Import SRLWrapper
import {SRLWrapper} from "simple-react-lightbox";

// Create an object with the callbacks that you want to use
const callbacks = {
    onSlideChange: object => console.log(object),
    onLightboxOpened: object => console.log(object),
    onLightboxClosed: object => console.log(object),
    onCountSlides: object => console.log(object)
};

function MyComponent() {
  return (
    <div className="MyComponent">
     <SRLWrapper callbacks={callbacks}>
        // Your images here
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```

## Firefox issue
I have noticed that sometimes Firefox has issues on rendering the "slide" animation. I will need to investigate this fully but I think it's related to a bug with Firefox and semi-transparent background. The solution is to change the `overlayColor` option to have a color without any transparency.
If you really want the transparency you can do a little hack and change the variable if the browser is Firefox. This only occurs rarely and especially with the "slide" animation. The "fade" animation should work perfectly regardless.

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
// Import SRLWrapper
import {SRLWrapper} from "simple-react-lightbox";

const browser = navigator.userAgent
const isFirefox = browser.indexOf('Firefox') > -1

const options = {
    settings: {
      overlayColor: isFirefox ? '#000000' : 'rgba(0,0,0,0,8)'
    }
};

function MyComponent() {
  return (
    <div className="MyComponent">
     <SRLWrapper callbacks={callbacks}>
        // Your images here
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;
```


## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                           |

## What the future holds 🔮

- Use TypeScript
