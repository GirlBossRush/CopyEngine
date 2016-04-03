(function() {
  "use strict"

  if (!window.addEventListener) return // Check for IE9+

  let element
  let options = INSTALL_OPTIONS

  function render({content, imageSrc, path}) {
    element = Eager.createElement(options.location, element)

    element.innerHTML = content.html
    element.classList.add("eager-article")
    element.dataset.eagerArticlePath = path

    if (imageSrc) {
      const {firstChild} = element
      const image = Object.assign(document.createElement("img"), {
        className: "eager-hero",
        src: imageSrc
      })

      firstChild ? element.insertBefore(image, firstChild) : element.appendChild(image)
    }
  }

  function checkHash() {
    const path = window.location.hash.split("#!")[1] || "/"
    const article = options.articles.find($ => $.path === path)

    if (article) render(article)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkHash)
  }
  else {
    checkHash()
  }

  window.addEventListener("hashchange", checkHash)

  INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      checkHash()
    }
  }
}())
