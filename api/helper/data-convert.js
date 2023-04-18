"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlug = exports.maskString = exports.removeSpecialChars = void 0;
const remove_diacritics_1 = __importDefault(require("remove-diacritics"));
function removeSpecialChars(inputStr) {
    return inputStr.replace(/[^a-zA-Z0-9]/g, '');
}
exports.removeSpecialChars = removeSpecialChars;
const maskString = (string) => {
    let firstPart = string.substring(0, 3);
    let lastPart = string.substring(string.length - 3);
    let middlePart = ''.padEnd(string.length - 6, '*');
    let masked = firstPart + middlePart + lastPart;
    return masked;
};
exports.maskString = maskString;
const toSlug = (string) => {
    const converted = (0, remove_diacritics_1.default)(string)
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    return converted;
};
exports.toSlug = toSlug;
