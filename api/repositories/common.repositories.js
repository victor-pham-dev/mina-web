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
exports.Searcher = void 0;
function Searcher(schema, filter, page, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentPage = (page - 1) * pageSize;
            const query = yield schema
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(currentPage)
                .limit(pageSize);
            const totalCount = yield schema.find(filter).countDocuments();
            if (query && totalCount) {
                return {
                    data: {
                        dataTable: query,
                        paging: {
                            page: page,
                            pageSize: pageSize,
                        },
                        totalCount: totalCount,
                    },
                };
            }
            else {
                return {
                    data: {
                        dataTable: [],
                        paging: {
                            page: 1,
                            pageSize: 1,
                        },
                        totalCount: 0,
                    },
                };
            }
        }
        catch (error) {
            throw new Error(`common search error:  ${error}`);
        }
    });
}
exports.Searcher = Searcher;
