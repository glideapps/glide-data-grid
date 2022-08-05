import "@testing-library/jest-dom";
import "jest-canvas-mock";

Image.prototype.decode = () => new Promise(resolve => window.setTimeout(resolve, 10));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
