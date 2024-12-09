import { Express } from 'express';

import taskRouter from './task';
import userRouter from './user';

export function RoutingInit(app: Express, SERVER_PORT: number) {

    app.use('/tasks', taskRouter);
    app.use('/users', userRouter);

    app.get('/', (_, res) => {
        res.json('Hello, server is working!');
    });
    
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port: ${SERVER_PORT}`);
    });

}


