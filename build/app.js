"use strict";

(function () {
  "use strict";

  if (!window.addEventListener) return; // Check for IE9+

  var element = void 0;
  var options = INSTALL_OPTIONS;

  function render(_ref) {
    var content = _ref.content;
    var imageSrc = _ref.imageSrc;
    var path = _ref.path;

    element = Eager.createElement(options.location, element);

    element.innerHTML = content.html;
    element.classList.add("eager-article");
    element.dataset.eagerArticlePath = path;

    if (imageSrc) {
      var _element = element;
      var firstChild = _element.firstChild;

      var image = Object.assign(document.createElement("img"), {
        className: "eager-hero",
        src: imageSrc
      });

      firstChild ? element.insertBefore(image, firstChild) : element.appendChild(image);
    }
  }

  function checkHash() {
    var path = window.location.hash.split("#!")[1] || "/";
    var article = options.articles.find(function ($) {
      return $.path === path;
    });

    if (article) render(article);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkHash);
  } else {
    checkHash();
  }

  window.addEventListener("hashchange", checkHash);

  INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;

      checkHash();
    }
  };
})();