import React from "react";
import { SRLCtx } from "../SRLContext";

export function withSRLContext(Component) {
  return function SRLHoc(props) {
    return (
      <SRLCtx.Consumer>
        {state => (
          <Component
            {...props}
            openLightbox={state.handleLightbox}
            closeLightbox={state.handleCloseLightbox}
          />
        )}
      </SRLCtx.Consumer>
    );
  };
}
