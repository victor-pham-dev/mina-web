"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisControl = void 0;
const common_1 = require("../config/common");
const redis = __importStar(require("redis"));
const redisClient = redis.createClient();
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
function setRecord(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield redisClient.setEx(key, common_1.redisExpiredTime, value);
        if (result) {
            return {
                ok: true,
                value: result,
            };
        }
        return {
            ok: false,
            value: '',
        };
    });
}
function getRecord(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExisted = yield redisClient.get(key);
        if (isExisted) {
            return {
                ok: true,
                value: isExisted,
            };
        }
        return {
            ok: false,
            value: '',
        };
    });
}
function removeRecord(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield redisClient.del(key);
        if (result === 1)
            return true;
        return false;
    });
}
exports.redisControl = {
    setRecord,
    getRecord,
    removeRecord,
};
