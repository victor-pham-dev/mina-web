"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRes = void 0;
const sendRes = function ({ res, code, msg, data }) {
    return res.status(code).send({ code: code, data: data, msg: msg });
};
exports.sendRes = sendRes;
