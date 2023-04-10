import { Request } from "express";
export interface RequestCustoms<T> extends Request {
   body: T
}