/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateDealInput:
 *       type: object
 *       required:
 *         - dealId
 *         - boardId
 *       properties:
 *         dealId:
 *           type: string
 *           description: Deal ID
 *           example: "123456789"
 *         boardId:
 *           type: string
 *           description: Project board ID
 *           example: "abcd-efgh-1234"
 */

/**
 * @swagger
 * components:
 *   parameters:
 *    Stage:
 *       name: stage
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: Stage of the deal
 *       example: "Project Kickoff"
 *    Type:
 *       name: type
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: Type of the deal
 *       example: "New Implementation Project"
 *
 */
