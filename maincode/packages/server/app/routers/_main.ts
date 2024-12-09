import { Express } from 'express';

import authRouter from './auth.router';
import taskRouter from './task.router';
import userRouter from './user.router';

import nodemailer from 'nodemailer';

export function RoutingInit(app: Express, SERVER_PORT: number) {
    app.use('/tasks', taskRouter);
    app.use('/users', userRouter);
    app.use('/auth', authRouter);

    app.get('/', (_, res) => {
        res.json('Hello, server is working!');
    });

    app.get('/email', (_, res) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.beget.com',
            port: 465,
            secure: true,
            auth: {
                user: 'test@4metra.ru',
                pass: 'U%smAo3S6E%J',
            },
        });

        const mailOptions = {
            from: '"Your Name" <test@4metra.ru>',
            to: 'aazab@ya.ru',
            subject: 'Hello!',
            html: `<h1>Welcome!</h1><p>This is an example email sent using Node.js.</p> ${Math.random()}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ', info.response);
            }
        });

        res.json('Email sent');
    });

    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port: ${SERVER_PORT}`);
    });
}
