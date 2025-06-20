import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

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

  getAuthUrl = (req: Request, res: Response) => {
    const authUrl = this.authService.generateAuthUrl();
    res.status(302).json(authUrl.data.authUrl);
  };

  getAccessToken = async (req: Request, res: Response): Promise<void> => {
    await this.authService.getAccessToken(req.query.code);
    res.status(200).json({ message: "Access token generated" });
  };
}
