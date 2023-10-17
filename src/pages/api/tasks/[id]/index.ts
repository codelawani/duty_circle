import { NextApiHandler } from "next";
import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import { butler } from "@/src/lib/services/butler";
import * as Boom from "@hapi/boom";
import apiHandler from "@/src/utils/api/api.handler";

const T_NOT_FOUND = "Task not found";

export const getTask: NextApiHandler = async (req, res) => {
  const taskId = butler.getIdFromReq(req);
  if (taskId) {
    const result = await taskService.getById(taskId);
    console.log(result);
    if (!result) throw Boom.notFound(T_NOT_FOUND);
    res.status(200).json(result);
  } else {
    throw Boom.badRequest("Task id is required");
  }
};

export const updateTask: NextApiHandler = async (req, res) => {
  const taskId = butler.getIdFromReq(req);
  const { id: userId } = await userService.validate(req, res);
  console.log(userId);
  const data = { ...req?.body, userId };

  const result = await taskService.update(taskId, data);
  console.log("taskId", taskId, result);
  res.status(201).json({ msg: "Task updated successfully" });
};

export const deleteTask: NextApiHandler = async (req, res) => {
  const taskId = butler.getIdFromReq(req);
  const response = await taskService.delete(taskId);
  res.status(204).json(response);
};

export default apiHandler({
  GET: getTask,
  PUT: updateTask,
  DELETE: deleteTask,
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     description: Retrieve a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The task was retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: The specified task ID is invalid.
 *       404:
 *         description: The specified task was not found.
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Task]
 *     description: Update a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
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
 *       400:
 *         description: The specified task ID is invalid.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: The specified task was not found.
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     description: Delete a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The task was deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the task was deleted successfully.
 *       400:
 *         description: The specified task ID is invalid.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: The specified task was not found.
 */
