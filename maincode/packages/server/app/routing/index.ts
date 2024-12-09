import { Express } from 'express';

import taskRouter from './task';

export function RoutingInit(app: Express, SERVER_PORT: number) {

    app.use('/tasks', taskRouter);

    app.get('/', (_, res) => {
        res.json('Hello, server is working!');
    });
    
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port: ${SERVER_PORT}`);
    });

}


