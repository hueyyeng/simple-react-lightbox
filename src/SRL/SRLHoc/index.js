import React from 'react'
import { SRLCtx } from '../SRLContext'

export function withSRLContext(Component) {
  return function SRLHoc(props) {
    return (
      <SRLCtx.Consumer>
        {state => (
          <Component
            {...props}
            openLightbox={() => state.dispatch({ type: 'HANDLE_ELEMENT' })}
            openAtIndex={index =>
              state.dispatch({ type: 'OPEN_AT_INDEX', index: index })
            }
          />
        )}
      </SRLCtx.Consumer>
    )
  }
}
