const pool = require('../config/db');

class Task {
    static async getAllTasks() {
        try {
            const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
            return result.rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async createTask(taskData) {
        const { title, due_date, completed } = taskData;

        try {
            const result = await pool.query('INSERT INTO tasks (title, due_date, completed) VALUES ($1, $2, $3) RETURNING *', [
                title,
                due_date,
                completed,
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateTask(id, updatedTask) {
        const { title, due_date, completed } = updatedTask;

        try {
            const result = await pool.query('UPDATE tasks SET title = $1, due_date = $2, completed = $3 WHERE id = $4 RETURNING *', [
                title,
                due_date,
                completed,
                id,
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteTask(id) {
        try {
            const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Task;
