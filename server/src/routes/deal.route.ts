import { Router } from "express";
import { HandleError } from "../middlewares/error.middleware";
import { DealController } from "../controllers/deal.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = DealController.getInstance();
const { handleError } = HandleError.getInstance();
const { refreshToken } = AuthMiddleware.getInstance();

/**
 * @swagger
 * /deals/filter:
 *   get:
 *     summary: Filter deals from Zoho
 *     tags: [Deal]
 *     parameters:
 *       - $ref: '#/components/parameters/Stage'
 *       - $ref: '#/components/parameters/Type'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/DealsResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/filter",
  refreshToken,
  handleError(controller.filterDeal.bind(controller))
);

export default router;
