import axios from "axios";
import { serviceResponse } from "../utils/response.util";
import { CustomError } from "../utils/CustomError.util";
import { ResponseOptions } from "../types/response.type";
import { HandleError } from "../middleware/error.middleware";
const { warpError } = HandleError.getInstance();

export class AuthService {
  private static instance: AuthService;
  private constructor() {}
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  generateAuthUrl = (): ResponseOptions => {
    const { ZOHO_CLIENT_ID, ZOHO_REDIRECT_URI, ZOHO_ACCOUNTS_URL } =
      process.env;
    const scope = ["ZohoCRM.modules.ALL", "ZohoCRM.settings.ALL"].join(",");
    return serviceResponse({
      statusText: "OK",
      message: "Redirecting to Zoho CRM",
      data: {
        authUrl: `${ZOHO_ACCOUNTS_URL}/oauth/v2/auth?scope=${scope}&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${ZOHO_REDIRECT_URI}`,
      },
    });
  };

  getAccessToken = warpError(async (code: string): Promise<ResponseOptions> => {
    const {
      ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET,
      ZOHO_REDIRECT_URI,
      ZOHO_ACCOUNTS_URL,
    } = process.env;
    const res = await axios.post(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, null, {
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
        "BadRequest",
        400,
        false,
        "Access token not generated"
      );
    return serviceResponse({
      statusText: "OK",
      message: "Access token generated",
      data: res.data,
    });
  });
}
