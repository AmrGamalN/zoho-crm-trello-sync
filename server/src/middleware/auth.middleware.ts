import { NextFunction, Request, Response } from "express";
import { ZohoToken } from "../models/mongodb/zohoToken.model";
import { HandleError } from "./error.middleware";
import axios from "axios";
const { handleError } = HandleError.getInstance();

export class AuthMiddleware {
  private static instance: AuthMiddleware;
  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  refreshToken = handleError(
    async (req: Request, res: Response, next: NextFunction) => {
      const tokenDoc = await ZohoToken.findOne();

      if (!tokenDoc) throw new Error("No token stored");

      const isExpired =
        Date.now() - tokenDoc.created_at.getTime() > tokenDoc.expires_in * 1000;

      let accessTokenToUse = tokenDoc.access_token;
      if (isExpired) {
        const refreshed = await this.createAccessToken(tokenDoc.refresh_token);
        tokenDoc.access_token = refreshed.access_token;
        tokenDoc.expires_in = refreshed.expires_in;
        tokenDoc.created_at = new Date();
        await tokenDoc.save();
        accessTokenToUse = refreshed.access_token;
      }
      req.headers["Authorization"] = `Zoho-oauthtoken ${accessTokenToUse}`;
      next();
    }
  );

  private createAccessToken = async (refresh_token: string) => {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          refresh_token,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          grant_type: "refresh_token",
        },
      }
    );

    return {
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
    };
  };
}
