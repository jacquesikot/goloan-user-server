import { Router, Request, Response } from 'express';
import * as _ from 'lodash';
import endpoints from '../endpoints';

import { userValidation } from '../../validation';
import { response, error } from '../../utils';
import { userService, logger } from '../../loaders/dependencyInjector';
import { masterAuth } from '../../middlewares';

const route = Router();

export default (app: Router) => {
    app.use(endpoints.user, masterAuth, route);

    route.post('/', async (req: Request, res: Response) => {
        try {
            const validation = userValidation(req.body);
            if (validation.error)
                return res
                    .status(400)
                    .send(error.invalidRequest(validation.error.details));

            const existingUser = await userService.checkIfUserExists(
                req.body.email,
            );
            if (existingUser)
                return res
                    .status(400)
                    .send(
                        error.generic(
                            `User with ${req.body.email} is already registered`,
                            400,
                        ),
                    );

            const newUser = await userService.createUser(req.body);
            res.status(201).send(
                response.single(
                    _.pick(newUser, [
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

        route.get('/:id', async (req: Request, res: Response) => {
            try {
                const user = await userService.getUserById(req.params.id);
                if (user.length < 1)
                    return res
                        .status(400)
                        .send(
                            error.generic(
                                'User with given id does not exist',
                                400,
                            ),
                        );

                res.send(response.single(user));
            } catch (error) {
                logger.error(error);
            }
        });
    });
};
