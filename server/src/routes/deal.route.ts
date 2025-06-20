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

/**
 * @swagger
 * /deals/update:
 *   patch:
 *     summary: Update a deal with Trello board ID
 *     tags: [Deal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDealInput'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/DefaultResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/update",
  refreshToken,
  handleError(controller.updateDeal.bind(controller))
);




export default router;
