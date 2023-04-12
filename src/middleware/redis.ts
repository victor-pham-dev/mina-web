import { redisExpiredTime } from '../config/common'
import * as redis from 'redis'

const redisClient = redis.createClient()
redisClient.on('connect', () => {
  console.log('Connected to Redis')
})
redisClient.on('error', (err) => console.log('Redis Client Error', err))
redisClient.connect()

interface RedisResult {
  ok: boolean
  value: string
}

async function setRecord(key: string, value: string): Promise<RedisResult> {
  const result: string = await redisClient.setEx(key, redisExpiredTime, value)
  if (result) {
    return {
      ok: true,
      value: result,
    }
  }
  return {
    ok: false,
    value: '',
  }
}

async function getRecord(key: string): Promise<RedisResult> {
  const isExisted: string = await redisClient.get(key)
  if (isExisted) {
    return {
      ok: true,
      value: isExisted,
    }
  }
  return {
    ok: false,
    value: '',
  }
}

async function removeRecord(key: string): Promise<boolean> {
  const result: number = await redisClient.del(key)
  if (result === 1) return true
  return false
}

export const redisControl = {
  setRecord,
  getRecord,
  removeRecord,
}
