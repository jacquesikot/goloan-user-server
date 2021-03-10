import { Router, Request, Response } from 'express';

import endpoints from '../endpoints';
const route = Router();

export default (app: Router) => {
    app.use(endpoints.home, route);

    route.get('/', (_req: Request, res: Response) => {
        res.status(200).send('Home');
    });
};
