/**
 * @swagger
 * /api/circles/{id}:
 *   get:
 *     summary: Get a circle by ID
 *     description: Retrieve a circle by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the circle to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The circle with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''
 *       404:
 *         description: The specified circle was not found.
 *
 *   put:
 *     summary: Update a circle by ID
 *     description: Update a circle by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the circle to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated circle object.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: ''
 *     responses:
 *       200:
 *         description: The circle was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message.
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Forbidden access.
 *       404:
 *         description: The specified circle was not found.
 *
 *   delete:
 *     summary: Delete a circle by ID
 *     description: Delete a circle by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the circle to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The circle was deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message.
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Forbidden access.
 *       404:
 *         description: The specified circle was not found.
 */
