const { sendResponse, sendError } = require('./api');
const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAllTasks();
        sendResponse(res, 200, tasks, 'Tasks retrieved successfully.');
    } catch (error) {
        sendError(res, 500, error.message);
    }
};

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
