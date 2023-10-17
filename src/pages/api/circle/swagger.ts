/**
 * @swagger
 * components:
 *   schemas:
 *     Circle:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the circle.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the circle was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the circle was last updated.
 *         name:
 *           type: string
 *           description: The name of the circle.
 *         adminId:
 *           type: string
 *           description: The ID of the user who created the circle.
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserCircle'
 *           description: The members of the circle.
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *           description: The tasks associated with the circle.
 *     UserCircle:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the user circle.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user circle was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user circle was last updated.
 *         user:
 *           $ref: ''
 *           description: The user associated with the user circle.
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the user circle.
 *         circle:
 *           $ref: '#/components/schemas/Circle'
 *           description: The circle associated with the user circle.
 *         circleId:
 *           type: string
 *           description: The ID of the circle associated with the user circle.
 *         role:
 *           type: string
 *           enum: [MEMBER, ADMIN]
 *           description: The role of the user in the circle.
 *
 * /api/circle:
 *   post:
 *     summary: Create a new circle.
 *     tags: [Circle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the circle.
 *     responses:
 *       201:
 *         description: Circle created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the circle was created successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   get:
 *     summary: Get the user's circle.
 *     tags: [Circle]
 *     responses:
 *       200:
 *         description: The user's circle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circle'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   put:
 *     summary: Update the user's circle.
 *     tags: [Circle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the circle.
 *     responses:
 *       200:
 *         description: Circle updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the circle was updated successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   delete:
 *     summary: Delete the user's circle.
 *     tags: [Circle]
 *     responses:
 *       200:
 *         description: Circle deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the circle was deleted successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
