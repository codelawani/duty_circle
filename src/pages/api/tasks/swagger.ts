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
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks
 *     description: Retrieve a list of tasks.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: The ID of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       404:
 *         description: The specified task was not found.
 */

/**
 * @swagger
 * /api/tasks:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       201:
 *         description: The task was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the task was updated successfully.
 *       401:
 *       404:
 *         description: The specified task was not found.
 */

/**
 * @swagger
 * /api/tasks:
 *   delete:
 *     summary: Delete a task
 *     description: Delete an existing task.
 *     responses:
 *       200:
 *         description: The task was deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the task was deleted successfully.
 *       401:
 *
 *       404:
 *         description: The specified task was not found.
 */
