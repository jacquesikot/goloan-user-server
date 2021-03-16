import { Router, Request, Response } from 'express';
import * as _ from 'lodash';

import endpoints from '../endpoints';
import { cardValidation } from '../../../src/validation';
import { cardService, logger } from '../../loaders/dependencyInjector';
import { error, response } from '../../utils';
import { masterAuth } from '../../middlewares';

const route = Router();

export default (app: Router) => {
    app.use(endpoints.card, masterAuth, route);

    route.post('/', async (req: Request, res: Response) => {
        try {
            const validation = cardValidation(req.body);
            if (validation.error)
                return res
                    .status(400)
                    .send(error.invalidRequest(validation.error.details));

            const newCard = await cardService.createCard(req.body);
            res.status(201).send(
                response.single(
                    _.pick(newCard, ['id', 'card_name', 'card_number']),
                ),
            );
        } catch (error) {
            logger.error(error);
        }
    });

    route.delete('/:id', async (req: Request, res: Response) => {
        try {
            const checkCard = await cardService.checkIfCardExists(
                req.params.id,
            );

            if (checkCard !== true)
                return res
                    .status(400)
                    .send(
                        error.generic(
                            `Card with ${req.params.id} does not exist`,
                            400,
                        ),
                    );

            await cardService.deleteCard(req.params.id);

            res.sendStatus(204);
        } catch (error) {
            logger.error(error);
        }
    });

    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const userCards = await cardService.getUserCards(req.params.id);
            if (userCards.length < 1)
                return res.send(
                    error.generic(
                        `User with id: ${req.params.id} has no bank card set`,
                        204,
                    ),
                );
            res.send(response.collection(userCards));
        } catch (error) {
            logger.error(error);
        }
    });
};
