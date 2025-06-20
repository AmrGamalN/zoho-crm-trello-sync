import { Router } from "express";
import { HandleError } from "../middlewares/error.middleware";
import { DealController } from "../controllers/deal.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = DealController.getInstance();
const { handleError } = HandleError.getInstance();
const { refreshToken } = AuthMiddleware.getInstance();

router.get(
  "/filter",
  handleError(refreshToken),
  handleError(controller.filterDeal.bind(controller))
);

export default router;
