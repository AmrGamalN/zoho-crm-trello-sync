/**
 * @swagger
 * components:
 *   responses:
 *     DealsResponse:
 *       description: Deals fetched successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusText:
 *                 type: string
 *                 example: OK
 *               success:
 *                 type: boolean
 *                 example: true
 *               statusCode:
 *                 type: number
 *                 example: 200
 *               message:
 *                 type: string
 *                 example: Get deals successfully
 *               data:
 *                 type: object
 *                 example: { deals: [] }

 *     DefaultResponse:
 *       description: Deal updated successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusText:
 *                 type: string
 *                 example: OK
 *               success:
 *                 type: boolean
 *                 example: true
 *               statusCode:
 *                 type: number
 *                 example: 200
 *               message:
 *                 type: string
 *                 example: Deal updated successfully
 */
