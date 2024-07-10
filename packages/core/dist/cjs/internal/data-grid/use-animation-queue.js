"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnimationQueue = void 0;
const React = __importStar(require("react"));
const cell_set_js_1 = require("./cell-set.js");
const render_state_provider_js_1 = require("../../common/render-state-provider.js");
function useAnimationQueue(draw) {
    const queue = React.useRef([]);
    const seq = React.useRef(0);
    const drawRef = React.useRef(draw);
    drawRef.current = draw;
    const loop = React.useCallback(() => {
        const requeue = () => window.requestAnimationFrame(fn);
        const fn = () => {
            const toDraw = queue.current.map(render_state_provider_js_1.unpackNumberToColRow);
            queue.current = [];
            drawRef.current(new cell_set_js_1.CellSet(toDraw));
            if (queue.current.length > 0) {
                seq.current++;
            }
            else {
                seq.current = 0;
            }
        };
        window.requestAnimationFrame(seq.current > 600 ? requeue : fn);
    }, []);
    return React.useCallback((item) => {
        if (queue.current.length === 0)
            loop();
        const packed = (0, render_state_provider_js_1.packColRowToNumber)(item[0], item[1]);
        if (queue.current.includes(packed))
            return;
        queue.current.push(packed);
    }, [loop]);
}
exports.useAnimationQueue = useAnimationQueue;
//# sourceMappingURL=use-animation-queue.js.map