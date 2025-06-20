import { ResponseOptions } from "./response.type";

export type expressContext = (req: any, res: any, next: any) => Promise<any> | void;
export type expressFunc = (...args: any[]) => Promise<ResponseOptions>;