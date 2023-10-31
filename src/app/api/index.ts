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
 *         completed:
 *           type: boolean
 *           description: The completion status of the task.
 *         consequence:
 *           type: string
 *           nullable: true
 *           description: The consequence of the task.
 *         public:
 *           type: boolean
 *           description: The privacy setting of the task.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The tags associated with the task.
 *       required:
 *         - title
 *       example:
 *         title: "Complete project proposal"
 *         description: "Write a proposal for the new project."
 *         dueDate: "2024-01-31T12:00:00Z"
 *         consequence: "Donate 50$ to Open Source Project"
 *         public: true
 *         tags: ["project", "proposal"]
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
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         image:
 *           type: string
 *           description: The image url of the user.
 *       required:
 *         - username
 *         - email
 *       example:
 *         id: "1"
 *         username: "jacksparrow"
 *         email: "jacksparrow@gmail.com"
 *         name: "Captain Jack Sparrow"
 *         image: "https://i.imgur.com/1.jpg"
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
