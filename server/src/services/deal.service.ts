import axios from "axios";
import { serviceResponse } from "../utils/response.util";
import { ResponseOptions } from "../types/response.type";
import { HandleError } from "../middlewares/error.middleware";
const { warpError } = HandleError.getInstance();
import qs from "qs";

const { ZOHO_API_BASE, STAGE, TYPE } = process.env;

export class DealService {
  private static instance: DealService;
  private constructor() {}
  public static getInstance(): DealService {
    if (!DealService.instance) {
      DealService.instance = new DealService();
    }
    return DealService.instance;
  }

  filterDeals = warpError(
    async (
      accessToken: string,
      body: { stage: string; type: string }
    ): Promise<ResponseOptions> => {
      const encodedCriteria = encodeURIComponent(
        `((Stage:equals:${body.stage}) and (Type:equals:${body.type}) and (Project_Board_ID_c:equals:null))`
      );
      const response = await axios.get(
        `${ZOHO_API_BASE}/Deals/search?criteria=${encodedCriteria}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      const deals = response?.data?.data;
      if (!deals || !Array.isArray(deals))
        return serviceResponse({
          statusText: "NotFound",
          message: "No data found",
        });

      return serviceResponse({
        statusText: "OK",
        message: "Deals filtered successfully",
        data: {
          deals,
        },
      });
    }
  );

  updateDeal = warpError(
    async (
      accessToken: string,
      dealId: string,
      boardId: string
    ): Promise<ResponseOptions> => {
      await axios.put(
        `${ZOHO_API_BASE}/Deals`,
        {
          data: [
            {
              id: dealId,
              Project_Board_ID_c: boardId,
            },
          ],
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      return serviceResponse({
        statusText: "OK",
        message: "Deal updated successfully",
      });
    }
  );
}
