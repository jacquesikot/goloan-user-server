import request from 'supertest';
import express from 'express';

import config from '../../../src/config';
import endpoints from '../../../src/api/endpoints';
import testHelpers from '../../../src/testHelpers';

let server: any;

describe(`${endpoints.card} - GET`, () => {
    beforeEach(async () => {
        const app = express();
        await require('../../../src/loaders').default({ expressApp: app });
        server = app.listen(config.port);
    });
    afterEach(async () => {
        await testHelpers.cleanDatabase();
        await server.close();
    });

    test('should return 204 and error message if no user cards found', async () => {
        const user = await testHelpers.createTestUser();

        const res = await request(server)
            .get(endpoints.card + `/${user!.id}`)
            .set('x-master-key', config.master_key);

        expect(res.body).toMatchObject({
            message: `User with id: ${user!.id} has no bank card set`,
            code: 204,
        });
    });

    test('should return user cards if correct id is passed', async () => {
        const user = await testHelpers.createTestUser();

        const userCards = await testHelpers.createTwoTestCards(user!.id);

        const res = await request(server)
            .get(endpoints.card + `/${user!.id}`)
            .set('x-master-key', config.master_key);

        expect(res.body.data.length).toBeGreaterThan(1);
        expect(res.body.data[0]).toHaveProperty(
            'card_name',
            userCards[0].card_name,
        );
        expect(res.body.data[1]).toHaveProperty(
            'card_name',
            userCards[1].card_name,
        );
    });
});
