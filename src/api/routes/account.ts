import { Router, Request, Response } from 'express';
import * as _ from 'lodash';

import { accountValidation } from '../../validation';
import { accountService, logger } from '../../loaders/dependencyInjector';
import { error, response } from '../../utils';
import endpoints from '../endpoints';

const route = Router();

export default (app: Router) => {
    app.use(endpoints.account, route);

    route.post('/', async (req: Request, res: Response) => {
        try {
            const validation = accountValidation(req.body);
            if (validation.error)
                return res
                    .status(400)
                    .send(error.invalidRequest(validation.error.details));

            const newAccount = await accountService.createAccount(req.body);
            res.status(201).send(
                response.single(
                    _.pick(newAccount, [
                        'id',
                        'account_bank',
                        'account_name',
                        'account_number',
                    ]),
                ),
            );
        } catch (error) {
            logger.error(error);
        }
    });

    route.delete('/:id', async (req: Request, res: Response) => {
        try {
            const checkAccount = await accountService.checkIfAccountExists(
                req.params.id,
            );

            if (checkAccount !== true)
                res.status(400).send(
                    error.generic(
                        `Account with ${req.params.id} does not exist`,
                        400,
                    ),
                );

            await accountService.deleteAccount(req.params.id);

            res.sendStatus(204);
        } catch (error) {
            logger.error(error);
        }
    });

    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const userAccounts = await accountService.getUserAccounts(
                req.params.id,
            );
            if (userAccounts.length < 1)
                res.send(
                    error.generic(
                        `User with id: ${req.params.id} has no bank account set`,
                        204,
                    ),
                );
            res.send(userAccounts);
        } catch (error) {
            logger.error(error);
        }
    });
};

// TODO: check status code for GET
