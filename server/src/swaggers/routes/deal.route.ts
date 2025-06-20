

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
