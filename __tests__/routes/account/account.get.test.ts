import request from 'supertest';
import express from 'express';

import config from '../../../src/config';
import endpoints from '../../../src/api/endpoints';
import testHelpers from '../../../src/testHelpers';

let server: any;

describe(`${endpoints.account} - GET`, () => {
    beforeEach(async () => {
        const app = express();
        await require('../../../src/loaders').default({ expressApp: app });
        server = app.listen(config.port);
    });
    afterEach(async () => {
        await testHelpers.cleanDatabase();
        await server.close();
    });

    test('should return 204 and error message if no user accounts found', async () => {
        const user = await testHelpers.createTestUser();

        const res = await request(server)
            .get(endpoints.account + `/${user!.id}`)
            .set('x-master-key', config.master_key);

        expect(res.body).toMatchObject({
            message: `User with id: ${user!.id} has no bank account set`,
            code: 200,
        });
    });

    test('should return user accounts if correct id is passed', async () => {
        const user = await testHelpers.createTestUser();

        const userAccounts = await testHelpers.createTwoTestAccounts(user!.id);

        const res = await request(server)
            .get(endpoints.account + `/${user!.id}`)
            .set('x-master-key', config.master_key);

        expect(res.body.data.length).toBeGreaterThan(1);
        expect(res.body.data[0]).toHaveProperty(
            'account_name',
            userAccounts[0].account_name,
        );
        expect(res.body.data[1]).toHaveProperty(
            'account_name',
            userAccounts[1].account_name,
        );
    });
});
