"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const regexp_1 = require("../const/regexp");
const userValidator = {
    register: function (body) {
        var _a;
        let valid = true;
        let msg = [];
        if (!body.name || ((_a = body.name) === null || _a === void 0 ? void 0 : _a.trim().length) === 0) {
            valid = false;
            msg.push('Name');
        }
        if (!body.email || body.email.trim().length === 0 || !regexp_1.REGEX.EMAIL.test(body.email)) {
            valid = false;
            msg.push('Email');
        }
        if (!body.password || body.password.trim().length < 6) {
            valid = false;
            msg.push('Password');
        }
        return { valid, msg };
    },
    //login with account
    loginWithAccount: function (body) {
        var _a, _b;
        let valid = true;
        let msg = [];
        if (!body.email || ((_a = body.email) === null || _a === void 0 ? void 0 : _a.trim().length) === 0 || !regexp_1.REGEX.EMAIL.test(body.email)) {
            valid = false;
            msg.push('Email');
        }
        if (!body.password || ((_b = body.password) === null || _b === void 0 ? void 0 : _b.trim().length) < 6) {
            valid = false;
            msg.push('Password');
        }
        return { valid, msg };
    },
};
exports.userValidator = userValidator;
