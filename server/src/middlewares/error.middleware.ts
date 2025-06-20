import { Request, Response, NextFunction } from "express";
import { expressContext, expressFunc } from "../types/middleware.type";
import { ResponseOptions } from "../types/response.type";
import { logger } from "../configs/winston.config";

export class HandleError {
  private static instance: HandleError;

  public static getInstance(): HandleError {
    if (!HandleError.instance) {
      HandleError.instance = new HandleError();
    }
    return HandleError.instance;
  }

  handleError = (fun: expressContext) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await fun(req, res, next);
      } catch (err: any) {
        logger.error(`${err.message}\n${err.stack}`);
        next(err);
      }
    };
  };

  errorMiddleware = () => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {},
      });
      logger.error(`${err.message}\n${err.stack}`);
    };
  };

  warpError = (fn: expressFunc) => {
    return async (...args: any[]): Promise<ResponseOptions | void> => {
      try {
        return await fn(...args);
      } catch (err: any) {
        logger.error(`${err.message}\n${err.stack}`);
        return {
          success: false,
          status: err.status || 500,
          message: err instanceof Error ? err.message : "Internal Server Error",
        };
      }
    };
  };
}
