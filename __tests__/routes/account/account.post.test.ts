import request from 'supertest';
import express from 'express';

import config from '../../../src/config';
import { IAccount } from '../../../src/interfaces';
import endpoints from '../../../src/api/endpoints';
import testHelpers from '../../../src/testHelpers';

let server: any;

describe(`${endpoints.account} - POST`, () => {
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

        const accountData: Partial<IAccount> = {
            user_id: user!.id,
            account_name: 'jimmy Falon',
            account_bank: '101',
            account_number: '1234',
        };

        const res = await request(server)
            .post(endpoints.account)
            .set('x-master-key', config.master_key)
            .send(accountData);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
    });

    test('it should return 200 and new account if succesful', async () => {
        const user = await testHelpers.createTestUser();

        const accountData: Partial<IAccount> = {
            user_id: user!.id,
            account_name: 'jimmy Falon',
            account_bank: '101',
            account_number: '1234567890',
        };

        const res = await request(server)
            .post(endpoints.account)
            .set('x-master-key', config.master_key)
            .send(accountData);

        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty(
            'account_name',
            accountData.account_name,
        );
    });
});
