import { Response } from "express";

export const sendResponse = (res: Response, statusCode: number, data: unknown, message: string) => {
    res.status(statusCode).json({ success: true, data, message });
};

export const sendError = (res: Response, statusCode: number, message: string) => {
    res.status(statusCode).json({ success: false, message });
};