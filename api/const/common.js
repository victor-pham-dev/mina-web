"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASS_STATUS = exports.CLASS_LEVEL = exports.REGIS_STATUS = exports.LEARN_METHOD = exports.FILE = exports.USER_STATUS = exports.ROLE = exports.MSG = exports.CODE = exports.KEY = void 0;
exports.KEY = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_KEY,
};
var CODE;
(function (CODE) {
    CODE[CODE["FAILED"] = 400] = "FAILED";
    CODE[CODE["AUTH_FAILED"] = 401] = "AUTH_FAILED";
    CODE[CODE["TOKEN_REQUIRED"] = 403] = "TOKEN_REQUIRED";
    CODE[CODE["CREATED"] = 201] = "CREATED";
    CODE[CODE["OK"] = 200] = "OK";
    CODE[CODE["NOT_FOUND"] = 404] = "NOT_FOUND";
    CODE[CODE["INTERNAL"] = 500] = "INTERNAL";
    CODE[CODE["EXIST"] = 409] = "EXIST";
})(CODE = exports.CODE || (exports.CODE = {}));
var MSG;
(function (MSG) {
    MSG["CREATED"] = "Created";
    MSG["EXISTED"] = "Existed";
    MSG["UNKNOW"] = "Unknow";
    MSG["UPDATED"] = "Updated";
    MSG["DELETED"] = "Deleted";
    MSG["NOT_FOUND"] = "Resource not found";
    MSG["INVALID"] = "Invalid resource";
    MSG["OK"] = "ok";
})(MSG = exports.MSG || (exports.MSG = {}));
var ROLE;
(function (ROLE) {
    ROLE[ROLE["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    ROLE[ROLE["STAFF"] = 1] = "STAFF";
    ROLE[ROLE["USER"] = 2] = "USER";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS[USER_STATUS["NOT_VERIFIED"] = 0] = "NOT_VERIFIED";
    USER_STATUS[USER_STATUS["VERIFIED"] = 1] = "VERIFIED";
    USER_STATUS[USER_STATUS["BANED"] = 2] = "BANED";
})(USER_STATUS = exports.USER_STATUS || (exports.USER_STATUS = {}));
exports.FILE = {
    SIZE: 5 * 1024 * 1024,
    ACCEPT: ['image/jpeg', 'image/png'],
};
var LEARN_METHOD;
(function (LEARN_METHOD) {
    LEARN_METHOD[LEARN_METHOD["ONLINE"] = 0] = "ONLINE";
    LEARN_METHOD[LEARN_METHOD["OFFLINE"] = 1] = "OFFLINE";
})(LEARN_METHOD = exports.LEARN_METHOD || (exports.LEARN_METHOD = {}));
var REGIS_STATUS;
(function (REGIS_STATUS) {
    REGIS_STATUS[REGIS_STATUS["INIT"] = 0] = "INIT";
    REGIS_STATUS[REGIS_STATUS["CHECKED"] = 1] = "CHECKED";
    REGIS_STATUS[REGIS_STATUS["CONFIRMED"] = 2] = "CONFIRMED";
    REGIS_STATUS[REGIS_STATUS["CANCELED"] = 3] = "CANCELED";
})(REGIS_STATUS = exports.REGIS_STATUS || (exports.REGIS_STATUS = {}));
var CLASS_LEVEL;
(function (CLASS_LEVEL) {
    CLASS_LEVEL["N1"] = "N1";
    CLASS_LEVEL["N2"] = "N2";
    CLASS_LEVEL["N3"] = "N3";
    CLASS_LEVEL["N4"] = "N4";
    CLASS_LEVEL["N5"] = "N5";
})(CLASS_LEVEL = exports.CLASS_LEVEL || (exports.CLASS_LEVEL = {}));
var CLASS_STATUS;
(function (CLASS_STATUS) {
    CLASS_STATUS[CLASS_STATUS["OPEN"] = 0] = "OPEN";
    CLASS_STATUS[CLASS_STATUS["PROCESSING"] = 1] = "PROCESSING";
    CLASS_STATUS[CLASS_STATUS["END"] = 2] = "END";
})(CLASS_STATUS = exports.CLASS_STATUS || (exports.CLASS_STATUS = {}));
