(function() {
  if (!window.addEventListener) return // Check for IE9+

  const elements = []
  let options = INSTALL_OPTIONS

  function updateElements() {
    const {regions} = options

    regions
      .reverse() // Match insertion order of configuration UI.
      .filter($ => $.content && $.content.markdown) // Blank regions
      .forEach(({content, location}, index) => {
        const element = elements[index] = Eager.createElement(location, elements[index])

        element.innerHTML = content.html
        element.classList.add("eager-region")
      })
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElements)
  }
  else {
    updateElements()
  }

  INSTALL_SCOPE = {
    setOptions(nextOptions) {
      elements.forEach(element => Eager.createElement(null, element))

      options = nextOptions

      updateElements()
    }
  }
}())
