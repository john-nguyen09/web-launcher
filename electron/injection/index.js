import(
  // eslint-disable-next-line import/no-unresolved
  "https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js"
).then(() => {
  const { SpatialNavigation } = window;

  if (typeof SpatialNavigation === "undefined") {
    return;
  }

  document.body.classList.add("web-launcher-intercepted");
  console.log("web-launcher-intercepted");

  SpatialNavigation.init();
  setMainScreenNavigation();

  watchForFocusTrap();
});

function setMainScreenNavigation() {
  const { SpatialNavigation } = window;
  SpatialNavigation.clear();
  SpatialNavigation.add({
    selector: [
      '.title-card a[role="link"]',
      'button[type="button"]',
      ".profile-link",
    ].join(", "),
  });
  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();
}

function setFocusTrapNavigation() {
  const { SpatialNavigation } = window;
  SpatialNavigation.clear();
  SpatialNavigation.add({
    selector: [
      '.focus-trap-wrapper .title-card a[role="link"]',
      '.focus-trap-wrapper button[type="button"]',
      ".focus-trap-wrapper .episode-item",
    ].join(", "),
  });
  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();
}

function watchForFocusTrap() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType == 1 && node.matches(".focus-trap-wrapper")) {
          setFocusTrapNavigation();
        }
      });
      mutation.removedNodes.forEach((node) => {
        if (node.nodeType == 1 && node.matches(".focus-trap-wrapper")) {
          setMainScreenNavigation();
        }
      });
    });
  });
  observer.observe(document.body, {
    subtree: true,
    childList: true,
  });
}
