import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { generateCookie } from "../utils/cookies.util";

export class AuthController {
  private static instance: AuthController;
  private authService: AuthService;
  constructor() {
    this.authService = AuthService.getInstance();
  }
  static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  redirectAuth = (req: Request, res: Response) => {
    const authUrl = this.authService.redirectAuth();
    res.status(302).json(authUrl.data.authUrl);
  };

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(req.query.code);
    if (!result?.success) return res.status(result?.status!).json(result);
    const { access_token, refresh_token, response } = result?.data;
    generateCookie(res, access_token, refresh_token);
    return res.status(200).json(response);
  };
}
