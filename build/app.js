"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var elements = [];
  var options = INSTALL_OPTIONS;

  function updateElements() {
    var _options = options;
    var regions = _options.regions;


    regions.reverse() // Match insertion order of configuration UI.
    .filter(function ($) {
      return $.content && $.content.markdown;
    }) // Blank regions
    .forEach(function (_ref, index) {
      var content = _ref.content;
      var location = _ref.location;

      var element = elements[index] = Eager.createElement(location, elements[index]);

      element.innerHTML = content.html;
      element.classList.add("eager-region");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElements);
  } else {
    updateElements();
  }

  INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      elements.forEach(function (element) {
        return Eager.createElement(null, element);
      });

      options = nextOptions;

      updateElements();
    }
  };
})();