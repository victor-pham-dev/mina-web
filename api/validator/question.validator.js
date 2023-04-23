"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionValidator = void 0;
function create(body) {
    var _a;
    let valid = true;
    let msg = [];
    if (!body.question) {
        valid = false;
        msg.push('question');
    }
    if (!body.answers || (body.answers && ((_a = body.answers) === null || _a === void 0 ? void 0 : _a.length) < 4)) {
        valid = false;
        msg.push('answers');
    }
    return { valid, msg };
}
exports.QuestionValidator = {
    create,
};
