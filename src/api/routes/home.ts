import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.get('/', (_req: Request, res: Response) => {
        res.send('Home').status(200);
    });
};
