import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.get('/', (_req: Request, res: Response) => {
        return res.send('User Service').status(200);
    });
};
