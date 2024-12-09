import { sendResponse, sendError } from '../base';

import { Task } from '../../models/task.model';
import { Response } from 'express';

//import { sequelize } from 'app/models';
//console.log(sequelize);

export const getAllTasks = async (_: any, res: Response) => {
    try {
        const tasks = await Task.findAll();
        sendResponse(res, 200, tasks, 'Tasks retrieved successfully.');
    } catch (error: unknown) {
        sendError(res, 500, (error as Error).message);
    }
};

/*
exports.createTask = async (req, res) => {
    try {
        const { title, due_date, completed } = req.body;
        const newTask = await Task.createTask({ title, due_date, completed });
        sendResponse(res, 201, newTask, 'Task created successfully.');
    } catch (error) {
        sendError(res, 500, error.message);
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, due_date, completed } = req.body;
        const updatedTask = await Task.updateTask(taskId, { title, due_date, completed });
        sendResponse(res, 200, updatedTask, 'Task updated successfully.');
    } catch (error) {
        sendError(res, 500, error.message);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.deleteTask(taskId);
        sendResponse(res, 200, deletedTask, 'Task deleted successfully.');
    } catch (error) {
        sendError(res, 500, error.message);
    }
};
*/