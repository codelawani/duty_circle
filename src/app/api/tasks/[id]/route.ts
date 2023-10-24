import { NextResponse as res } from "next/server";
import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";
import * as Boom from "@hapi/boom";
import apiHandler from "@/src/utils/api/api.handler";
import { Params } from "@/src/lib/types/server";
const T_NOT_FOUND = "Task not found";

const getTask = async (req: Request, { params }: Params) => {
  const taskId = params.id;
  if (taskId) {
    const result = await taskService.getPublicTask(taskId);
    if (!result) throw Boom.notFound(T_NOT_FOUND);
    return res.json(result);
  } else {
    throw Boom.badRequest("Task id is required");
  }
};

const updateTask = async (req: Request, { params }: Params) => {
  const taskId = params.id;
  const { id: userId } = await userService.validate();
  const data = await req.json();

  const result = await taskService.update(taskId, { ...data, userId });
  console.log("taskId", taskId, result);
  return res.json({ msg: "Task updated successfully" }, { status: 201 });
};

const deleteTask = async (req: Request, { params }: Params) => {
  const taskId = params.id;
  const response = await taskService.delete(taskId);
  return res.json(response);
};
// export const GET = getTask;
export const GET = apiHandler({
  GET: getTask,
});
export const PUT = apiHandler({
  PUT: updateTask,
});
export const DELETE = apiHandler({
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
