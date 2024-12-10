import { Express } from 'express';

import authRouter from './auth.router';
import taskRouter from './task.router';
import userRouter from './user.router';

export function RoutingInit(app: Express, SERVER_PORT: number) {
    
    // наборы роутов
    app.use('/auth', authRouter); // отвечает за регистрацию, аутентификацию и восстановление пароля
    app.use('/tasks', taskRouter);
    app.use('/users', userRouter);
    

    app.get('/', (_, res) => {
        res.json('Hello, server is working!');
    });

    app.get('/email', (_, res) => {
        res.json('Email sent');
    });

    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port: ${SERVER_PORT}`);
    });
}
