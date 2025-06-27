import { Request, Response } from "express";
import { DealService } from "../services/deal.service";
import { AutoService } from "../services/auto.service";
import { controllerResponse } from "../utils/response.util";

export class DealController {
  private static instance: DealController;
  private dealService: DealService;
  private autoService: AutoService;
  constructor() {
    this.dealService = DealService.getInstance();
    this.autoService = AutoService.getInstance();
  }
  static getInstance(): DealController {
    if (!DealController.instance) {
      DealController.instance = new DealController();
    }
    return DealController.instance;
  }

  createBoard = async (req: Request, res: Response) => {
    await this.autoService.createBoard(req.body);
  };

  filterDeal = async (req: Request, res: Response) => {
    const result = await this.dealService.filterDeals(
      req.cookies?.access_token,
      req.query
    );
    return controllerResponse(res, result);
  };
}
