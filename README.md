#Simple-React-Lightbox (SRL)

<p align="center">

<img src="https://www.michelec.site/app/uploads/SRL/SRL_Logo.png" width="180px" height="auto" style="padding: 20px 0;"/>

</p>

####A brief introduction 🧐

It all started when I was working on one of my project using React. The client had a blog page and he wanted to add a light-box to the images in the blog posts. The problem is that the data was fetched from the backend so for every post I had no control over the content (the content coming from a WYSIWYG editor).

I checked online for some light-box for React but in each and every one of them you had to declare the images beforehand in either an array, an object etc...but what if you don't know about the content and you just want to add a light-box to the images? 😞

####My Idea 💡

**Simple React Lightbox** gives you the ability to add a light-box functionality on a set of images, wether you define them yourself or you get them from an external source (API, backend etc…). Just use the provided component to wrap your app and then use the "SRLWrapper" component by wrapping it around the content in which you have your images (or just the images). 😮 _The caption of the images is generated from the [image alt tag](https://www.w3schools.com/tags/tag_img.asp)!_

####Packed with features 📦

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

<br/>
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

Next you want to import and use the SRLWrapper component wherever expect the content with the images on which you want to add the light-box functionality. Please note the `{}` as this is a named export.

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
######The light-box with the default options
<br/>

####Options
I know what you are thinking. That's cool and all but the style of the light-box dosen't match the one of my project. I will grab your classes and override things with my custom styles... **WAIT!** ⚠️Despite the fact that I have made sure to define class names for each part of the light-box, I have provided all the options that you need to customize the light-box so that you don't have to add any additional logic. You can customize everything! Check the options below

| Option          | Type    | Default                                                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| overlayColor    | string  | rgba(0, 0, 0, 0.9)                                                                                                                                                | This is the background color of he light-box. You can set an rgba() value if you want to control the opacity. Any CSS Color value is valid.                                                                                                                                                                                                                                                                                                                                                 |
| captionStyle    | object  | `captionStyle: { captionColor: "#FFFFFF", captionFontFamily: "inherit", captionFontSize: "inherit", captionFontWeight: "inherit", captionFontStyle: "inherit" },` | This is an object that defines the styles for the caption. You can control the color, size, family, weight and style of the font. Those values depends of course on the font that you are using. Font Style is just the CSS property text-transform (none/capitalize/uppercase/lowercase/initial/inherit).                                                                                                                                                                                  |
| buttonsStyle    | object  | `buttonsStyle: { buttonsBackgroundColor: "rgb(30,30,36,0.8)", buttonsIconColor: "rgba(255, 255, 255, 0.8)"}`,                                                     | This is an object that defines the style for the buttons and the icon inside the button. So you can control both of them easily. Any CSS Color value is valid **but there is some magic 🎩 happening in here**: if you use an rgba() value for the icon and set the opacity (like "0.8" as showed in the default value), when you hover with the mouse on the icon this will create a nice css hover effect by automatically changing the opacity to "1", regardless the colour you choose. |
| autoplaySpeed   | number  | 3000                                                                                                                                                              | Controls the auto play change interval. **Set it to 0** if you don't want the auto play functionallity and you want to hide the button.                                                                                                                                                                                                                                                                                                                                                     |
| transitionSpeed | number  | 600                                                                                                                                                               | Controls the transition speed of when an image is swapped with another. **Be gentle** as using a really high value can potentially cause issues.                                                                                                                                                                                                                                                                                                                                            |
| showCaption     | boolean | true                                                                                                                                                              | Show/hide the caption. _The caption of the images is generated from the [image alt tag](https://www.w3schools.com/tags/tag_img.asp)!_                                                                                                                                                                                                                                                                                                                                                       |
| showThumbnails  | boolean | true                                                                                                                                                              | Show/hide the thumbnail gallery.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

<br />
#### Yes, options! But how do I use them?

Passing options is as simple as defining props for a React component. Actually, the options **are** props for the SimpleReactLightbox component. I will strongely reccomend to create a constant with all the options and then [spread it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) in the component. Is fast, readable and easy to amend. Thanks ES6 😎

```jsx
import React from "react";
import MyComponent from "./components/MyComponent";
import SimpleReactLightbox from "simple-react-lightbox"; // Import Simple React Lightbox

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
######The light-box with the custom options

<br />
#### High Order Component

⚠️ **_Please note this feature might be removed in the future_** ⚠️
Sometimes you maybe have a lot of images and yes, the user could open the light-box clicking on the first one. But every website is designed differently and UI / UX play a big part when designing and coding a website. So I created a HOC _[High Order Component](https://reactjs.org/docs/higher-order-components.html)_ that you can use to get access to two methods:

| Method        | Description                                       |
| ------------- | ------------------------------------------------- |
| openLightbox  | Opens the light-box starting from the first image |
| closeLightbox | Closes the light-box                              |

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

<br />
##Example project

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

<br />
## What the future holds 🔮
- I know that usually the way people implements an image gallery is by setting a div with a background image and then wrap the `div` in a `a` tag to do something with the image. Or maybe they just use a thumbnail and link to the full image. Unfortunately in this case, **Simple React Lightbox** is not going to work as it scans for actual `img` and not links. I might consider to create a separated option in the future to allow this behaviour.
- Use TypeScript
