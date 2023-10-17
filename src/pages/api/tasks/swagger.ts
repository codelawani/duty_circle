/**
 * @swagger
 * components:
 *   responses:
 *     Unauthorized:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: A short error code.
 *         message:
 *           type: string
 *           description: A human-readable error message.
 *       required:
 *         - error
 *         - message
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
 */
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     description: Create a new task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the task was created successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks
 *     description: Retrieve a list of tasks.
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: The specified task was not found.
 */
