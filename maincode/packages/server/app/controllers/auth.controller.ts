import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { sendResponse, sendError } from './_base';
import { User } from '../models/user.model';

// регистрация пользователя
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return sendError(res, 409, 'User with this email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });
        sendResponse(res, 201, newUser, 'User created successfully.');
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { name = null, email, password, status } = req.body;
        const updatedUser = await User.update({ name, email, password, status }, { where: { id: userId } });
        sendResponse(res, 200, updatedUser, 'User updated successfully.');
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.destroy({ where: { id: userId } });
        sendResponse(res, 200, deletedUser, 'User deleted successfully.');
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
};

// TODO: доделать все методы в контроллере

export const getUser = async (_: any, res: Response) => {
    res.sendStatus(200);
}

export const loginUser = async (_: any, res: Response) => {
    res.sendStatus(200);
}

export const registerUser = async (_: any, res: Response) => {
    res.sendStatus(200);
}