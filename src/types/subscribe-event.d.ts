declare module 'subscribe-event' {
  function subscribe(
    element: HTMLElement | Node | object,
    event: string,
    eventCallback: (() => void) | ((e: any) => void),
    options?: any
  ): () => void
  namespace subscribe {}
  export = subscribe
}
