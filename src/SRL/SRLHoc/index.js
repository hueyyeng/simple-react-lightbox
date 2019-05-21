import React from "react";
import { Consumer } from "../SRLContext";

export function withContext(Component) {
  return function SRLHoc(props) {
    return (
      <Consumer>{state => <Component {...props} context={state} />}</Consumer>
    );
  };
}
