"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEX = void 0;
exports.REGEX = {
    PHONE: /^(0[3578]{1}[0-9]{8})$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.[A-Z])(?=.[0-9])/,
};
