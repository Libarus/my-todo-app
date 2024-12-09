const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async createUser(userData) {
        const { name, phone, email, age, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10); // Хэшируем пароль перед сохранением

        try {
            const result = await pool.query('INSERT INTO users (name, phone, email, age, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
                name,
                phone,
                email,
                age,
                hashedPassword,
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findByEmail(email) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (!result.rows.length) {
                //throw new Error('User not found');
                return false;
            }
            
            return result.rows[0];

        } catch (error) {

            throw new Error(error.message);
        }
    }

    static async comparePasswords(candidatePassword, hash) {
        return bcrypt.compare(candidatePassword, hash);
    }
}

module.exports = User;
