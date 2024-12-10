import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { sendResponse, sendError } from './_base';
import { User, EUserStatus } from '../models/user.model';
import { generateAuthToken } from '../shared/services/token';
//import { Email } from '../shared/services/emails';

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

        // TODO: сделать отправку письма
        //const emailData = Email.GetRegisterTemplateEmail();
        //Email.SendEmail(email, '', emailData.subject, emailData.body);

        sendResponse(res, 201, newUser, 'User created successfully.');
    } catch (error: any) {
        sendError(res, 500, (error as Error).message);
    }
};

export const login = async (req: any, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return sendError(res, 404, 'User not found.');
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return sendError(res, 401, 'Invalid credentials.');
        }

        if (user.status != EUserStatus.ACTIVE) {
            return sendError(res, 406, 'User is not active.');
        }

        if (!user.emailConfirmed) {
            return sendError(res, 406, 'User email is not confirmed.');
        }

        const token = generateAuthToken(user.id);
        // TODO: сделать генерацию и проверку refresh-токена
        res.cookie('jwt',  token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7}); // Срок жизни куки - 7 дней
        sendResponse(res, 200, { user }, 'Logged in successfully.');
        
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
}

/*
export const recover = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { name = null, email, password, status } = req.body;
        const updatedUser = await User.update({ name, email, password, status }, { where: { id: userId } });
        sendResponse(res, 200, updatedUser, 'User updated successfully.');
    } catch (error) {
        sendError(res, 500, (error as Error).message);
    }
};

export const verify = async (req: Request, res: Response) => {
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


export const registerUser = async (_: any, res: Response) => {
    res.sendStatus(200);
}
*/