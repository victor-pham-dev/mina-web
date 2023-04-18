"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidator = void 0;
function create(body) {
    var _a, _b, _c;
    let valid = true;
    let msg = [];
    if (!body.title || (body.title && ((_a = body.title) === null || _a === void 0 ? void 0 : _a.trim().length) === 0)) {
        valid = false;
        msg.push('Class level');
    }
    if (!body.type || (body.type && ((_b = body.type) === null || _b === void 0 ? void 0 : _b.trim().length) === 0)) {
        valid = false;
        msg.push('Creator Id');
    }
    if (!body.content || (body.content && ((_c = body.content) === null || _c === void 0 ? void 0 : _c.trim().length) === 0)) {
        valid = false;
        msg.push('Creator Id');
    }
    return { valid, msg };
}
exports.PostValidator = {
    create,
};
