import axios from "axios";
import { serviceResponse } from "../utils/response.util";
import { CustomError } from "../utils/customError.util";
import { ResponseOptions } from "../types/response.type";
import { HandleError } from "../middlewares/error.middleware";
const { warpError } = HandleError.getInstance();
const {
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REDIRECT_URI,
  ZOHO_ACCOUNTS_URL,
  ZOHO_AUTH_URL,
} = process.env;

export class AuthService {
  private static instance: AuthService;
  private constructor() {}
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  redirectAuth = (): ResponseOptions => {
    return serviceResponse({
      statusText: "OK",
      message: "Redirecting to Zoho OAuth page",
      data: {
        authUrl: ZOHO_AUTH_URL,
      },
    });
  };

  login = warpError(async (code: string): Promise<ResponseOptions> => {
    const res = await axios.post(`${ZOHO_ACCOUNTS_URL}/token`, null, {
      params: {
        code,
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        redirect_uri: ZOHO_REDIRECT_URI,
        grant_type: "authorization_code",
      },
    });
    if (res.data.error)
      throw new CustomError(
        "Unauthorized",
        401,
        false,
        "Error in getting access token"
      );
    return serviceResponse({
      statusText: "OK",
      message: "login successful",
      data: res.data,
    });
  });
}
