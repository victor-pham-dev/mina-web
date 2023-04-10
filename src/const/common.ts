export const KEY = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
}

export const CODE = {
  FAILED: 400,
  AUTH_FAILED: 401,
  TOKEN_REQUIRED: 403,
  CREATED: 201,
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL: 500,
  EXIST: 409,
}

export const MSG = {
  CREATED: 'Created',
  EXISTED: 'Existed',
  UNKNOW: 'Unknow',
}

export const ROLE = {
  ADMIN: 'admin',
  STAFF: 'staff',
  customer: 'customer',
}

export const USER_STATUS = {
  0: 'NOT_VERIFIED',
  1: 'VERIFIED',
  2: 'BANED',
}

export const FILE = {
  SIZE: 5 * 1024 * 1024,
  ACCEPT: ['image/jpeg', 'image/png'],
}
