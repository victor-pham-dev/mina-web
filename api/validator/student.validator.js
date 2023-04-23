"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidator = void 0;
function create(body) {
    let valid = true;
    let msg = [];
    if (!body.classId) {
        valid = false;
        msg.push('Class id');
    }
    if (!body.regisId) {
        valid = false;
        msg.push('name');
    }
    return { valid, msg };
}
exports.StudentValidator = {
    create,
};
