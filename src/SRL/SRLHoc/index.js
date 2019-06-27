import React from "react";
import { SRLCtx } from "../SRLContext";

export function withContext(Component) {
  return function SRLHoc(props) {
    return (
      <SRLCtx.Consumer>
        {state => <Component {...props} context={state} />}
      </SRLCtx.Consumer>
    );
  };
}
