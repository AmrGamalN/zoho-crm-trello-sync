import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError.util";
import { generateCookie } from "../utils/cookies.util";
import axios from "axios";
const { ZOHO_CLIENT_SECRET, ZOHO_CLIENT_ID, ZOHO_ACCOUNTS_URL } = process.env;

export class AuthMiddleware {
  private static instance: AuthMiddleware;
  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken || refreshToken === "undefined")
      throw new CustomError("Unauthorized", 401, false, "Unauthorized");

    if (!accessToken) {
      const newAccessToken = await this.createNewAccessToken(refreshToken);
      generateCookie(res, newAccessToken, refreshToken);
    }
    return next();
  };

   createNewAccessToken = async (refresh_token: string) => {
    const response = await axios.post(`${ZOHO_ACCOUNTS_URL}/token`, null, {
      params: {
        refresh_token,
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        grant_type: "refresh_token",
      },
    });
    return response.data.access_token;
  };
}
