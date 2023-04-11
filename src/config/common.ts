export const redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

export const redisExpiredTime: number = Number(process.env.REDIS_EXPIRED_TIME)
