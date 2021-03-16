import { Router, Request, Response } from 'express';

import { masterAuth } from '../../middlewares';

import { mailService } from '../../loaders/dependencyInjector';

import testHelpers from '../../testHelpers';

import endpoints from '../endpoints';

const route = Router();

export default (app: Router) => {
    app.use(endpoints.home, route);

    route.get('/', masterAuth, async (_req: Request, res: Response) => {
        await testHelpers.cleanDatabase();

        const reply = await mailService.testMailchimp();

        res.send(reply);
    });
};
