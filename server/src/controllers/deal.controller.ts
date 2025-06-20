import { Request, Response } from "express";
import { DealService } from "../services/deal.service";
import { controllerResponse } from "../utils/response.util";

export class DealController {
  private static instance: DealController;
  private dealService: DealService;
  constructor() {
    this.dealService = DealService.getInstance();
  }
  static getInstance(): DealController {
    if (!DealController.instance) {
      DealController.instance = new DealController();
    }
    return DealController.instance;
  }

  filterDeal = async (req: Request, res: Response) => {
    const result = await this.dealService.filterDeals(
      req.headers["Authorization"],
      req.query
    );
    return controllerResponse(res, result);
  };
}
