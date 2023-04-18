"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisClassModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const regexp_1 = require("../const/regexp");
const common_1 = require("../const/common");
const RegisClassSchema = new mongoose_1.default.Schema({
    classId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return regexp_1.REGEX.PHONE.test(value);
            },
            message: 'Invalid phone format',
        },
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return regexp_1.REGEX.EMAIL.test(value);
            },
            message: 'Invalid email format',
        },
    },
    method: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return Object.values(common_1.LEARN_METHOD).includes(value);
            },
            message: 'Invalid phone format',
        },
    },
    status: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return Object.values(common_1.REGIS_STATUS).includes(value);
            },
            message: 'Invalid status',
        },
    },
    classLevel: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return Object.values(common_1.CLASS_LEVEL).includes(value);
            },
            message: 'Invalid phone format',
        },
    },
    knowFrom: {
        type: String,
        required: true,
    },
    everStudied: {
        type: Boolean,
        required: true,
    },
    leanTo: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: String,
        required: false,
    },
});
RegisClassSchema.plugin(mongoose_timestamp_1.default);
exports.RegisClassModel = mongoose_1.default.model('regisclasses', RegisClassSchema);
