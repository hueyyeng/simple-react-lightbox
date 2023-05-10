# @hueyyeng/simple-react-lightbox

[![npm version](https://badge.fury.io/js/@hueyyeng%2Fsimple-react-lightbox.svg)](https://badge.fury.io/js/@hueyyeng%2Fsimple-react-lightbox)

A demo that uses the latest version of this library can be found on my personal website: [https://taukeke.com/gallery](https://taukeke.com/gallery)

Modified React lightbox based on Michele Cocuccio's Simple React Lightbox. The original README.md can be found here: [README.old.md](README.old.md).

As the original GitHub repository no longer exists/accessible, I made some minor tweaking to suit my requirements hence the
forking (although I originally forked it from a forked repo of the original repository).

Also the code has been converted to **TypeScript** (using TypeScript 5.0).

## Changes Since v3.6.9 by Michele Cocuccio

- **NEW:** Converted to **TypeScript**
- **NEW:** Add **react-remove-scroll** dependencies
- Override **.react-transform-wrapper** overflow to inherit
- Expose **react-zoom-pan-pinch** `limitToBounds` settings
- Remove **body-scroll-lock** dependencies and logic
- Remove Travis CI config and reference

## Quickstart

The following steps should suffice to get it up and running in your React app.

Currently this is only tested with React 17. Likely to work with no issue for React 16 but not guaranteed
with React 18. Feel free to open a pull request if you made it compatible with React 18!

Lastly, I tested this with **Node 16**. Also requires **yarn**!

1. Clone this repository with `git clone yourpreferredmethod.git @hueyyeng/simple-react-lightbox` using either SSH or HTTPS. The resulting folder should look like this (e.g. yourreactapp/packages/@hueyyeng/simple-react-lightbox).
2. Optionally, exclude it using React app `.gitignore`.
3. Add this to your React app `package.json` dependencies (using step 1 example path).

```json
  "dependencies": {
    ...,
    "simple-react-lightbox": "file:packages/@hueyyeng/simple-react-lightbox",
  },
```

4. Navigate to `yourreactapp/packages/@hueyyeng/simple-react-lightbox` folder.
5. Run `yarn build:dev`.

Refer to [README.old.md](README.old.md) on the usage. I'm unsure how it works for non-CreateReactApp (CRA) project
but if you're using CRA, you need to run `yarn build:dev` whenever you make changes to **simple-react-lightbox** for CRA
to automatically reload with the new changes.

## Usage

> Make sure at least **Node 16** and **yarn** installed.

### Development

1. Run `yarn install`.
2. Modify the existing codes as required.
3. Run `yarn build:dev` to generate the build output. The dev build have inline sourcemaps for debugging in browser.

### Production

1. Run `yarn install`.
2. Modify the existing codes as required.
3. Run `yarn build` to generate the production build output.

## Known Issues

1, Several forked of this project modified the React version range to include React 16. As this library uses React Context introduced in React 16.3, try to target that version as the absolute minimum version.
