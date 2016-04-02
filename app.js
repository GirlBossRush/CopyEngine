(function() {
  // Check for IE9+
  if (!window.addEventListener) return

  const UPDATE_DELAY = 1500

  let options= INSTALL_OPTIONS

  function unmountNode(node) {
    if (node && node.parentNode) node.parentNode.removeChild(node)
  }

  function updateElement() {
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement)
  }
  else {
    updateElement()
  }

  INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      updateElement()
    }
  }
}())
