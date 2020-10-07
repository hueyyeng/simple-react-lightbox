/* ATTACH AN EVENT LISTENER TO AN ELEMENT */
export function handleAttachListener(e, element, callback) {
  e.addEventListener('click', () => {
    // Run the function to handle the clicked item
    if (callback) return callback(element)
  })
}
