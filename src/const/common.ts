export const KEY =  {
  ACCESS_TOKEN : process.env.ACCESS_TOKEN_KEY,
}

export enum CODE {
  FAILED = 400,
  AUTH_FAILED = 401,
  TOKEN_REQUIRED = 403,
  CREATED = 201,
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL = 500,
  EXIST = 409,
}

export enum MSG {
  CREATED = 'Created',
  EXISTED = 'Existed',
  UNKNOW = 'Unknow',
}

export enum ROLE {
  SUPER_ADMIN = 0,
  STAFF = 1,
  USER = 2,
}

export enum USER_STATUS {
  NOT_VERIFIED = 0,
  VERIFIED = 1,
  BANED = 2,
}

export const FILE =  {
  SIZE : 5 * 1024 * 1024,
  ACCEPT : ['image/jpeg', 'image/png'],
}
