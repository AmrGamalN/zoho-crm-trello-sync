/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Redirect to Zoho OAuth page
 *     description: Redirects the user to Zoho's authorization page.
 *     tags: [OAuth]
 *
 *     responses:
 *       302:
 *         description: Successfully redirected to Zoho
 *         headers:
 *           Location:
 *             description: URL to which the user is redirected
 *             schema:
 *               type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Handle OAuth callback and get access token
 *     description: Handles the OAuth provider's callback and exchanges code for an access token.
 *     tags:
 *       - OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Authorization code returned by the OAuth provider
 *     responses:
 *       200:
 *         description: Successfully retrieved access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *                 expires_in:
 *                   type: number
 *       400:
 *         description: Missing or invalid authorization code
 *       500:
 *         description: Error while retrieving access token
 */
