"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.commonAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const redis_1 = require("./redis");
function compareTokenRedis(reqToken, redisToken) {
    if (reqToken === redisToken)
        return true;
    return false;
}
//
const commonAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers['x-access-token'];
    if (!accessToken)
        return (0, response_handler_1.sendRes)({
            res: res,
            code: common_1.CODE.TOKEN_REQUIRED,
            msg: 'MISSING: ACCESS_TOKEN',
            data: null,
        });
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        req.user = decoded;
        const redisExisted = yield redis_1.redisControl.getRecord(decoded.email);
        if (!redisExisted.ok || !compareTokenRedis(accessToken, redisExisted.value))
            return (0, response_handler_1.sendRes)({
                res: res,
                code: common_1.CODE.TOKEN_REQUIRED,
                msg: 'TOKEN CHANGED',
                data: null,
            });
        next();
    }
    catch (error) {
        throw new Error(`error common authentication ${error}`);
    }
});
exports.commonAuth = commonAuth;
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers['x-access-token'];
    if (!accessToken)
        return (0, response_handler_1.sendRes)({
            res: res,
            code: common_1.CODE.TOKEN_REQUIRED,
            msg: 'MISSING: ACCESS_TOKEN',
            data: null,
        });
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        req.user = decoded;
        if (decoded.role > common_1.ROLE.STAFF) {
            return (0, response_handler_1.sendRes)({
                res: res,
                code: common_1.CODE.TOKEN_REQUIRED,
                msg: 'NO PERMISSION',
                data: null,
            });
        }
        const redisExisted = yield redis_1.redisControl.getRecord(decoded.email);
        if (!redisExisted)
            return (0, response_handler_1.sendRes)({
                res: res,
                code: common_1.CODE.TOKEN_REQUIRED,
                msg: 'TOKEN INVALID',
                data: null,
            });
        next();
    }
    catch (error) {
        throw new Error(`error admin authentication ${error}`);
    }
});
exports.adminAuth = adminAuth;
