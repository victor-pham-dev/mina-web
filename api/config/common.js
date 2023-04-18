"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisExpiredTime = exports.redisUrl = void 0;
exports.redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
exports.redisExpiredTime = Number(process.env.REDIS_EXPIRED_TIME);
