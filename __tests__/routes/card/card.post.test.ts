import request from 'supertest';
import express from 'express';

import config from '../../../src/config';
import { ICard } from '../../../src/interfaces';
import endpoints from '../../../src/api/endpoints';
import testHelpers from '../../../src/testHelpers';

let server: any;

describe(`${endpoints.card} - POST`, () => {
    beforeEach(async () => {
        const app = express();
        await require('../../../src/loaders').default({ expressApp: app });
        server = app.listen(config.port);
    });
    afterEach(async () => {
        await testHelpers.cleanDatabase();
        await server.close();
    });

    test('it should return 400 if account validation fails', async () => {
        const user = await testHelpers.createTestUser();

        const cardData: Partial<ICard> = {
            user_id: user.id,
            card_name: 'jimmy Falon',
            card_cvv: '101',
            card_number: '1234',
            card_expiry: '2512',
        };

        const res = await request(server).post(endpoints.card).send(cardData);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
    });

    test('should return 201 and new card if successful', async () => {
        const user = await testHelpers.createTestUser();

        const cardData: Partial<ICard> = {
            user_id: user.id,
            card_name: 'jimmy Falon',
            card_cvv: '101',
            card_number: '1234567899874563',
            card_expiry: '2512',
        };

        const res = await request(server).post(endpoints.card).send(cardData);

        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty('card_name', cardData.card_name);
    });
});
