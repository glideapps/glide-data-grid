import "@testing-library/jest-dom";
import "jest-canvas-mock";

Image.prototype.decode = () => new Promise(resolve => window.setTimeout(resolve, 10));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

Object.defineProperty(global.navigator, "clipboard", {
    value: { write: () => void 0 },
    writable: true,
});

Object.defineProperties(global, {
    ClipboardItem: { value: jest.fn() },
    Blob: { value: jest.fn() },
});

Object.defineProperty(HTMLElement.prototype, 'innerText', {
    set: function(v) {
        this.textContent = v
    }
})

Object.defineProperty(global, 'DataTransfer', {
  value: jest.fn(),
});
