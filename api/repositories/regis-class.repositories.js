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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisClassRepositories = void 0;
const model_index_1 = require("../models/model.index");
const RegisClasses = model_index_1.database.regisclasses;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield RegisClasses.create(payload);
            if (result) {
                return {
                    ok: true,
                    data: result._id,
                };
            }
            return {
                ok: false,
                data: null,
            };
        }
        catch (error) {
            throw new Error(`repositories:Create error: ${error}`);
        }
    });
}
function get(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield RegisClasses.findById(_id);
            if (result) {
                return {
                    ok: true,
                    data: result,
                };
            }
            return {
                ok: false,
                data: null,
            };
        }
        catch (error) {
            throw new Error(`repositories:Create error: ${error}`);
        }
    });
}
function put(_id, key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newValue = {
                [key]: value,
            };
            const result = yield RegisClasses.findOneAndUpdate({ _id }, newValue);
            console.log(result);
            if (result) {
                return {
                    ok: true,
                    data: null,
                };
            }
            return {
                ok: false,
                data: null,
            };
        }
        catch (error) {
            throw new Error(`repositories:Create error: ${error}`);
        }
    });
}
exports.RegisClassRepositories = {
    create,
    put,
    get,
};
