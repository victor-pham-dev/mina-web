"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regisClassValidator = void 0;
const regexp_1 = require("../const/regexp");
function regis(body) {
    var _a, _b, _c, _d, _e;
    let valid = true;
    let msg = [];
    if (!body.name || (body.name && ((_a = body.name) === null || _a === void 0 ? void 0 : _a.trim().length) === 0)) {
        valid = false;
        msg.push('Name');
    }
    if (!body.phone || (body.phone && !regexp_1.REGEX.PHONE.test(body.phone))) {
        valid = false;
        msg.push('Phone');
    }
    if (!body.address || (body.address && ((_b = body.address) === null || _b === void 0 ? void 0 : _b.trim().length) === 0)) {
        valid = false;
        msg.push('Address');
    }
    if (!body.phone || (body.email && !regexp_1.REGEX.EMAIL.test(body.email))) {
        valid = false;
        msg.push('Email');
    }
    if (!body.facebookLink || (body.facebookLink && ((_c = body.facebookLink) === null || _c === void 0 ? void 0 : _c.trim().length) === 0)) {
        valid = false;
        msg.push('Facebook Link');
    }
    if (body.method === undefined || body.method === null) {
        valid = false;
        msg.push('Method');
    }
    if (!body.classLevel || (body.classLevel && body.classLevel.trim().length === 0)) {
        valid = false;
        msg.push('Class level');
    }
    if (!body.knowFrom || (body.knowFrom && ((_d = body.knowFrom) === null || _d === void 0 ? void 0 : _d.trim().length) === 0)) {
        valid = false;
        msg.push('Know From');
    }
    if (body.everStudied === undefined || body.everStudied === null) {
        valid = false;
        msg.push('Ever Studied');
    }
    if (!body.leanTo || (body.leanTo && ((_e = body.leanTo) === null || _e === void 0 ? void 0 : _e.trim().length) === 0)) {
        valid = false;
        msg.push('Learn to');
    }
    return { valid, msg };
}
exports.regisClassValidator = {
    regis,
};
