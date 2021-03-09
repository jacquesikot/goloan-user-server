import { Router, Request, Response } from 'express';
import * as _ from 'lodash';

import { userValidation } from '../../validation';
import { response, error } from '../../utils';
import { userService, logger } from '../../loaders/dependencyInjector';

const route = Router();

export default (app: Router) => {
    app.use('/v1/users', route);

    route.post('/', async (req: Request, res: Response) => {
        try {
            const validation = userValidation(req.body);
            if (validation.error)
                return res
                    .status(400)
                    .send(error.invalidRequest(validation.error.details));

            const existingUser = await userService.checkIfUserExists(req.body);
            if (existingUser)
                return res
                    .status(400)
                    .send(
                        error.generic(
                            `User with ${req.body.email} is already registered`,
                            400,
                        ),
                    );

            const user = await userService.createUser(req.body);
            res.send(
                response.single(
                    _.pick(user, [
                        'id',
                        'first_name',
                        'last_name',
                        'gender',
                        'email',
                        'phone_number',
                    ]),
                ),
            );
        } catch (error) {
            logger.error(error);
        }
    });
};
