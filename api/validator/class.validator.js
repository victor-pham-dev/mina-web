"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidator = void 0;
function create(body) {
    var _a, _b;
    let valid = true;
    let msg = [];
    if (!body.classLevel || (body.classLevel && ((_a = body.classLevel) === null || _a === void 0 ? void 0 : _a.trim().length) === 0)) {
        valid = false;
        msg.push('Class level');
    }
    if (!body.creatorId || (body.creatorId && ((_b = body.creatorId) === null || _b === void 0 ? void 0 : _b.trim().length) === 0)) {
        valid = false;
        msg.push('Creator Id');
    }
    if (!body.daysOfWeek) {
        valid = false;
        msg.push('Day of week');
    }
    if (!body.startDate) {
        valid = false;
        msg.push('startDate');
    }
    if (!body.numberOfLessons) {
        valid = false;
        msg.push('numberOfLessons');
    }
    if (!body.time) {
        valid = false;
        msg.push('Time');
    }
    if (!body.description) {
        valid = false;
        msg.push('Desciption');
    }
    return { valid, msg };
}
exports.ClassValidator = {
    create,
};
