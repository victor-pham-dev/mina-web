export const KEY = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN_KEY,
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
  UPDATED = 'Updated',
  DELETED = 'Deleted',
  NOT_FOUND = 'Resource not found',
  INVALID = 'Invalid resource',
  OK = 'ok',
  MISSING_PARAMS = 'missing params',
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

export const FILE = {
  SIZE: 5 * 1024 * 1024,
  ACCEPT: ['image/jpeg', 'image/png'],
}

export enum LEARN_METHOD {
  ONLINE = 0,
  OFFLINE = 1,
}

export enum REGIS_STATUS {
  INIT = 0,
  CHECKED = 1,
  CONFIRMED = 2,
  CANCELED = 3,
}

export enum CLASS_LEVEL {
  N1 = 'N1',
  N2 = 'N2',
  N3 = 'N3',
  N4 = 'N4',
  N5 = 'N5',
  N5B = 'N5B',
}

export enum CLASS_STATUS {
  OPEN = 0, //for recruit student
  PROCESSING = 1, //class is started
  END = 2, // class ended
}
