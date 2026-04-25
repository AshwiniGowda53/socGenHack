import "@testing-library/jest-dom";

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;
