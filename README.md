# Simple React Lightbox (SRL)

Modified React lightbox based on Michele Cocuccio's Simple React Lightbox. The original README.md can be found here: [README.old.md](README.old.md).

As the original GitHub repository no longer exists/accessible, I like the overall features (versus other React lighbox) and made some minor tweaking to suit my requirements hence the forking (although I originally forked it from a forked repo of the original repository).

## New Changes Since v3.6.9 by Michele Cocuccio

- **NEW** Add **react-remove-scroll** dependencies
- Override **.react-transform-wrapper** overflow to inherit
- Expose **react-zoom-pan-pinch** `limitToBounds` settings
- Remove **body-scroll-lock** dependencies and logic
- Remove Travis CI config and reference

## Quickstart Usage

The following steps should suffice to get it up and running in your React app.

Currently this is only tested with React 17. Likely to work with no issue for React 16 but not guaranteed with React 18. Feel free to open a pull request if you made it compatible with React 18!

Lastly, I tested this with Node 16. Also requires **yarn**!

1. Clone this repository (e.g. yourreactapp/packages/simple-react-lightbox).
2. Optionally, exclude it using `.gitignore`.
3. Add this to your `package.json` dependencies (using step 1 example path).
```json
  "dependencies": {
    ...,
    "simple-react-lightbox": "./packages/simple-react-lightbox",
  },
```
4. Navigate to the root folder.
5. Run `yarn build`.

Refer to [README.old.md](README.old.md) on the usage. I'm unsure how it works for non-CreateReactApp (CRA) project but if you're using CRA, you need to run `yarn build` whenever you make changes to **simple-react-lightbox** for CRA to automatically reload with the new changes.

## Future Plan

I'm planning to release this forked package on npm. If I have the time, I'll convert it into TypeScript.
