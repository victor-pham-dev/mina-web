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
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const model_index_1 = require("../models/model.index");
const user_validator_1 = require("../validator/user.validator");
const redis_1 = require("../middleware/redis");
const Users = model_index_1.database.users;
// function: create accessToken
function createAccessToken(email, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ email: email, role: role }, common_1.KEY.ACCESS_TOKEN, {
            expiresIn: '7d',
        });
        return token;
    });
}
//
//function encrypt password
function encrypter(str) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedStr = yield bcrypt_1.default.hash(str, 10);
        return encryptedStr;
    });
}
//
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, password, email, gender, yOB } = req.body;
            //validate body
            let bodyValid = user_validator_1.userValidator.register(req.body);
            // console.log(bodyValid);
            if (!bodyValid.valid) {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.FAILED,
                    msg: bodyValid.msg.toString(),
                    data: null,
                });
            }
            //check exist
            const existPhone = yield Users.findOne({ email });
            if (existPhone) {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.EXIST,
                    msg: common_1.MSG.EXISTED,
                    data: null,
                });
            }
            //hash password
            const encryptedPassword = yield encrypter(password);
            //create new user
            const user = yield Users.create({
                password: encryptedPassword,
                name: name,
                email: email,
                role: common_1.ROLE.USER,
                gender: gender,
                yOB: yOB,
                status: common_1.USER_STATUS.VERIFIED,
                deleted: false,
            });
            if (user) {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.CREATED,
                    msg: 'OK',
                    data: null,
                });
            }
            else {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.FAILED,
                    msg: common_1.MSG.UNKNOW,
                    data: null,
                });
            }
        }
        catch (err) {
            throw new Error(`some thing wrong went regis new user ${err}`);
        }
    });
}
function LoginWithAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        let bodyValid = user_validator_1.userValidator.loginWithAccount(req.body);
        if (!bodyValid.valid) {
            return (0, response_handler_1.sendRes)({
                res: res,
                code: common_1.CODE.FAILED,
                msg: bodyValid.msg.toString(),
                data: null,
            });
        }
        try {
            const user = yield Users.findOne({ email });
            if (!user || user === null) {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.FAILED,
                    msg: 'Invalid email or password',
                    data: null,
                });
            }
            else {
                const passwordValid = yield bcrypt_1.default.compare(password, user.password);
                if (passwordValid) {
                    const accessToken = yield createAccessToken(email, user.role);
                    const replaceRedisResult = yield redis_1.redisControl.setRecord(email, accessToken);
                    if (replaceRedisResult.ok) {
                        return (0, response_handler_1.sendRes)({
                            res: res,
                            code: common_1.CODE.OK,
                            msg: 'OK',
                            data: { accessToken },
                        });
                    }
                    else {
                        return (0, response_handler_1.sendRes)({
                            res: res,
                            code: common_1.CODE.INTERNAL,
                            msg: 'Server Error',
                            data: null,
                        });
                    }
                }
                else {
                    return (0, response_handler_1.sendRes)({
                        res: res,
                        code: common_1.CODE.FAILED,
                        msg: 'Invalid email or password',
                        data: null,
                    });
                }
            }
        }
        catch (err) {
            throw new Error(`some thing wrong when login ${err}`);
        }
    });
}
//authen check token and get profile
function Auth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Users.findOne({ email: req.user.email }, { password: 0 });
            if (user) {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.OK,
                    msg: 'OK',
                    data: user,
                });
            }
            else {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.FAILED,
                    msg: 'Invalid Token',
                    data: null,
                });
            }
        }
        catch (error) {
            throw new Error(`get profile error ${error}`);
        }
    });
}
exports.UserController = {
    Register,
    LoginWithAccount,
    Auth,
};
