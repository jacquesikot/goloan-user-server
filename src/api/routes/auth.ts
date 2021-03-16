import { Router, Request, Response } from 'express';

import { authService, userService } from '../../loaders/dependencyInjector';
import { authValidation } from '../../validation';
import { error, response } from '../../utils';
import { masterAuth } from '../../middlewares';

import endpoints from '../endpoints';
const route = Router();

export default (app: Router) => {
    app.use(endpoints.auth, masterAuth, route);

    route.post('/', async (req: Request, res: Response) => {
        const validation = authValidation(req.body);
        if (validation.error)
            return res
                .status(400)
                .send(error.invalidRequest(validation.error.details));

        let user = await userService.findUserByEmail(req.body.email);
        if (!user)
            return res
                .status(400)
                .send(error.generic('Invalid email or password', 400));

        const validPassword = await authService.validatePassword(
            req.body.password,
            user.password,
        );
        if (!validPassword)
            return res
                .status(400)
                .send(error.generic('Invalid email or password', 400));

        const token = await authService.generateAuthToken(user);
        const data = {
            token,
        };
        res.send(response.single(data));
    });
};
