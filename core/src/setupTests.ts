import "@testing-library/jest-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-canvas-mock";

Enzyme.configure({ adapter: new Adapter() });
Image.prototype.decode = () => new Promise(resolve => window.setTimeout(resolve, 10));
