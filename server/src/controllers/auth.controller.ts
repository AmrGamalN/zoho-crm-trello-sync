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

  getAccessToken = (req: Request, res: Response) => {
    const { code } = req.query;
    this.authService.getAccessToken(code as string).then((data) => {
      res.json(data);
    });
  };
}
