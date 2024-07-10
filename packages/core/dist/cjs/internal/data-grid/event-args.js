"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouseEventArgsAreEqual = exports.OutOfBoundsRegionAxis = exports.outOfBoundsKind = exports.groupHeaderKind = exports.headerKind = void 0;
/** @category Types */
exports.headerKind = "header";
/** @category Types */
exports.groupHeaderKind = "group-header";
/** @category Types */
exports.outOfBoundsKind = "out-of-bounds";
/** @category Types */
var OutOfBoundsRegionAxis;
(function (OutOfBoundsRegionAxis) {
    OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Start"] = -2] = "Start";
    OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["StartPadding"] = -1] = "StartPadding";
    OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Center"] = 0] = "Center";
    OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["EndPadding"] = 1] = "EndPadding";
    OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["End"] = 2] = "End";
})(OutOfBoundsRegionAxis || (exports.OutOfBoundsRegionAxis = OutOfBoundsRegionAxis = {}));
function mouseEventArgsAreEqual(args, other) {
    if (args === other)
        return true;
    if (args?.kind === "out-of-bounds") {
        return (args?.kind === other?.kind &&
            args?.location[0] === other?.location[0] &&
            args?.location[1] === other?.location[1] &&
            args?.region[0] === other?.region[0] &&
            args?.region[1] === other?.region[1]);
    }
    return (args?.kind === other?.kind &&
        args?.location[0] === other?.location[0] &&
        args?.location[1] === other?.location[1]);
}
exports.mouseEventArgsAreEqual = mouseEventArgsAreEqual;
//# sourceMappingURL=event-args.js.map