"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailValidator = void 0;
const regexp_1 = require("../const/regexp");
const sendMailValidator = {
    send: function (body) {
        var _a;
        let valid = true;
        let msg = [];
        if (!body.subject || ((_a = body.subject) === null || _a === void 0 ? void 0 : _a.trim().length) === 0) {
            valid = false;
            msg.push('subject');
        }
        if (!body.to || body.to.trim().length === 0 || !regexp_1.REGEX.EMAIL.test(body.to)) {
            valid = false;
            msg.push('Email Receive');
        }
        if (!body.body) {
            valid = false;
            msg.push('Body');
        }
        return { valid, msg };
    }
};
exports.sendMailValidator = sendMailValidator;
