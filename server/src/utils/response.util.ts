import { ResponseOptions } from "../types/response.type";
import { Response } from "express";

export const controllerResponse = (res: Response, response: any): Response => {
  if (!response.success) return res.status(response.status!).json(response);
  return res.status(response.status!).json(response);
};

export const serviceResponse = ({
  statusText,
  message,
  data,
  error,
}: ResponseOptions) => {
  const defaultMessages = {
    OK: "Operation successfully",
    BadRequest: "Invalid data",
    NotFound: "Item not found",
    InternalServerError: "InternalServerError",
  };
  switch (statusText) {
    case "OK":
      return {
        statusText: "OK",
        success: true,
        status: 200,
        message: message ?? defaultMessages.OK,
        data,
      };

    case "BadRequest":
      return {
        statusText: "BadRequest",
        success: false,
        status: 400,
        message: message ?? defaultMessages.BadRequest,
        error,
      };

    case "NotFound":
      return {
        statusText: "NotFound",
        success: false,
        status: 404,
        message: message ?? defaultMessages.NotFound,
        data: [],
      };

    case "InternalServerError":
      return {
        statusText: "InternalServerError",
        success: false,
        status: 500,
        message: message ?? defaultMessages.InternalServerError,
        error,
      };

    default:
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
  }
};