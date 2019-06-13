import React from "react";
import { SRLCtxt } from "../SRLContext";

export function withContext(Component) {
  return function SRLHoc(props) {
    return (
      <SRLCtxt.Consumer>
        {state => <Component {...props} context={state} />}
      </SRLCtxt.Consumer>
    );
  };
}
