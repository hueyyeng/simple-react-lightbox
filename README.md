# @hueyyeng/simple-react-lightbox

[![npm version](https://badge.fury.io/js/@hueyyeng%2Fsimple-react-lightbox.svg)](https://badge.fury.io/js/@hueyyeng%2Fsimple-react-lightbox)

> A demo that uses the latest version of this library can be found on my personal website: [https://taukeke.com/gallery](https://taukeke.com/gallery)

Modified React lightbox based on Michele Cocuccio's Simple React Lightbox. The original README.md can be found here: [README.old.md](README.old.md).

Since the original GitHub repository is no longer accessible, I had to make some custom modifications to align with my specific
needs. As a result, I ended up forking the project from a repository that was itself a fork of the original repository.

The code has also been converted to TypeScript, using TypeScript 5.0.

## Changes Since v3.6.9 by Michele Cocuccio

- **NEW:** Converted to **TypeScript**
- **NEW:** Add **react-remove-scroll** dependencies
- Override **.react-transform-wrapper** overflow to inherit
- Expose **react-zoom-pan-pinch** `limitToBounds` settings
- Remove **body-scroll-lock** dependencies and logic
- Remove Travis CI config and reference

## Quickstart

To get started with this library in your React app, follow these steps:

1. Make sure you have **React** installed. Although the library has been tested with React 17 and
   is expected to work with React 16, compatibility with React 18 is not guaranteed. If you have made
   it compatible with React 18, please feel free to open a pull request.
2. Ensure you have **Node.js 16** installed.
3. Use **Yarn** as your package manager, as it is required for this library.

### Installing as Local Package

1. Clone this repository with `git clone yourpreferredmethod.git @hueyyeng/simple-react-lightbox` using
   either SSH or HTTPS. The resulting folder should look like this (e.g. yourreactapp/packages/@hueyyeng/simple-react-lightbox).
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

> Make sure at least **Node.js 16** and **Yarn** installed.

### Development

1. Run `yarn install`.
2. Modify the existing codes as required.
3. Run `yarn build:dev` to generate the build output. The dev build have inline sourcemaps for debugging in browser.

### Production

1. Run `yarn install`.
2. Modify the existing codes as required.
3. Run `yarn build` to generate the production build output.

## Known Issues

1. Several forks of this project have adjusted the React version range to include React 16. However,
   since this library relies on React Context, which was introduced in React 16.3, it is recommended
   to set React 16.3 as the minimum required version.
