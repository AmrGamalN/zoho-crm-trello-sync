import { Router } from "express";
import { HandleError } from "../middlewares/error.middleware";
import { DealController } from "../controllers/deal.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = DealController.getInstance();
const { handleError } = HandleError.getInstance();
const { refreshToken } = AuthMiddleware.getInstance();

router.post(
  "/filter",
  handleError(refreshToken),
  handleError(controller.filterDeal.bind(controller))
);

router.post(
  "/create-board",
  handleError(refreshToken),
  handleError(controller.createBoard.bind(controller))
);

export default router;
