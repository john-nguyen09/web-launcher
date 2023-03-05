import "./spatial_navigation.js";

const INTERCEPTED_CLASS_NAME = "web-launcher-intercepted";

if (!document.body.classList.contains(INTERCEPTED_CLASS_NAME)) {
  init();
}

function init() {
  const { SpatialNavigation } = window;

  if (typeof SpatialNavigation === "undefined") {
    return;
  }

  document.body.classList.add("web-launcher-intercepted");
  console.log("web-launcher-intercepted");

  SpatialNavigation.init();
  setMainScreenNavigation();

  watchForFocusTrap();
}

function setMainScreenNavigation() {
  const { SpatialNavigation } = window;
  SpatialNavigation.clear();
  ['.title-card a[role="link"]', 'button[type="button"]', ".profile-link"].forEach(
    (selector) => {
      SpatialNavigation.add({ selector, straightOverlapThreshold: 0.1 });
    },
  );
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

function isElement(node: Node): node is Element {
  return node.nodeType === 1;
}

function watchForFocusTrap() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (isElement(node) && node.matches(".focus-trap-wrapper")) {
          setFocusTrapNavigation();
        }
      });
      mutation.removedNodes.forEach((node) => {
        if (isElement(node) && node.matches(".focus-trap-wrapper")) {
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
