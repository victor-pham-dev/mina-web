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
exports.StudentRepositories = void 0;
const model_index_1 = require("../models/model.index");
const common_1 = require("../const/common");
const class_repositories_1 = require("./class.repositories");
const Students = model_index_1.database.students;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundClass = yield class_repositories_1.ClassRepositories.get(payload.classId);
        if (!foundClass.ok ||
            foundClass.data.status === common_1.CLASS_STATUS.END ||
            !foundClass.data.recruiting) {
            return {
                ok: false,
                data: null,
                msg: 'Class not found or closed',
            };
        }
        try {
            console.log(payload);
            const result = yield Students.create(payload);
            console.log(result);
            if (result) {
                return {
                    ok: true,
                    data: result._id,
                    msg: 'ok',
                };
            }
            return {
                ok: false,
                data: null,
                msg: 'create failed',
            };
        }
        catch (error) {
            throw new Error(`repositories-student:Create error: ${error}`);
        }
    });
}
function get(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Students.findById(_id);
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
            throw new Error(`repositories-student:Get error: ${error}`);
        }
    });
}
function patch(_id, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Students.findOneAndUpdate({ _id }, newValue);
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
            throw new Error(`repositories-student:patch error: ${error}`);
        }
    });
}
function search({ filter, page, pageSize, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('repo:student', filter);
        try {
            const currentPage = (page - 1) * pageSize;
            const result = yield Students.aggregate([
                {
                    $match: filter,
                },
                {
                    $lookup: {
                        from: 'classes',
                        let: { searchId: { $toObjectId: '$classId' } },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$searchId'] } } },
                            {
                                $project: {
                                    _id: 1,
                                    classLevel: 1,
                                    teacher: 1,
                                    numberOfLessons: 1,
                                    daysOfWeek: 1,
                                    startDate: 1,
                                    time: 1,
                                },
                            },
                        ],
                        as: 'classInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'regisclasses',
                        let: { searchId: { $toObjectId: '$regisId' } },
                        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$searchId'] } } }],
                        as: 'regisInfo',
                    },
                },
            ])
                .sort({ createdAt: -1 })
                .skip(currentPage)
                .limit(pageSize)
                .exec();
            const totalCount = yield Students.find(filter).countDocuments();
            if (result) {
                console.log(result);
                return {
                    ok: true,
                    data: {
                        dataTable: result,
                        paging: { page: page, pageSize: pageSize },
                        totalCount: totalCount,
                    },
                };
            }
            else {
                console.log('khong co');
            }
        }
        catch (error) {
            throw new Error(`repositories-student:Search error: ${error}`);
        }
    });
}
exports.StudentRepositories = {
    create,
    patch,
    get,
    search,
};
