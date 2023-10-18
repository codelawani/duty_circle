/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task.
 *         description:
 *           type: string
 *           nullable: true
 *           description: A description of the task.
 *         dueDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The due date of the task.
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED]
 *           description: The status of the task.
 *         consequence:
 *           type: string
 *           nullable: true
 *           description: The consequence of the task.
 *         privacy:
 *           type: string
 *           enum: [PRIVATE, PUBLIC, CIRCLE]
 *           description: The privacy setting of the task.
 *         circleId:
 *           type: string
 *           nullable: true
 *           description: The ID of the circle that the task belongs to.
 *       required:
 *         - title
 *         - privacy
 *     Circle:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the circle.
 *         description:
 *           type: string
 *           nullable: true
 *           description: A description of the circle.
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of the members in the circle.
 *       required:
 *         - name
 */

/**
 * @swagger
 * components:
 *   responses:
 *     BadRequestError:
 *       description: The request was invalid or cannot be served.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     Unauthorized:
 *       description: Authentication failed or user does not have permissions for the requested operation.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     TooManyRequestsError:
 *       description: Too many requests have been received in a given amount of time.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     InternalServerError:
 *       description: An error occurred while processing the request.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message describing the error.
 *       example:
 *         message: "An error occurred while processing the request."
 */
