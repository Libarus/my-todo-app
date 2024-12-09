import { sendResponse, sendError } from '../base';

import { Task } from '../../models/task';
import { Request, Response } from 'express';

//import { sequelize } from 'app/models';
//console.log(sequelize);

/**
 * @openapi
 * /tasks
 * get:
 *  summary: Get all tasks / Получение всех задач
 *  description: Get all tasks / Получение всех задач
 *  responses:
 *      200:
 *          description: Tasks retrieved successfully / Задачи получены успешно
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Task'
 * @param _ 
 * @param res 
 */
export const getAllTasks = async (_: any, res: Response) => {
    try {
        const tasks = await Task.findAll();
        sendResponse(res, 200, tasks, 'Tasks retrieved successfully.');
    } catch (error: unknown) {
        sendError(res, 500, (error as Error).message);
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, dueDate, completed } = req.body;
        const newTask = await Task. create({ title, dueDate, completed });
        sendResponse(res, 201, newTask, 'Task created successfully.');
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { title, dueDate, completed } = req.body;
        const updatedTask = await Task.update({ title, dueDate, completed }, { where: { id: taskId } });
        sendResponse(res, 200, updatedTask, 'Task updated successfully.');
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.destroy({ where: { id: taskId } });
        sendResponse(res, 200, deletedTask, 'Task deleted successfully.');
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
};
