import request from 'supertest';
import express from 'express';

import config from '../../../src/config';
import endpoints from '../../../src/api/endpoints';
import testHelpers from '../../../src/testHelpers';

let server: any;

describe(`${endpoints.account} - DELETE`, () => {
    beforeEach(async () => {
        const app = express();
        await require('../../../src/loaders').default({ expressApp: app });
        server = app.listen(config.port);
    });
    afterEach(async () => {
        await testHelpers.cleanDatabase();
        await server.close();
    });

    test('should return 400 if account id does not exist', async () => {
        const fake_account_id = '1';

        const res = await request(server)
            .delete(endpoints.account + `/${fake_account_id}`)
            .set('x-master-key', config.master_key)
            .send();

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({
            message: `Account with ${fake_account_id} does not exist`,
            code: 400,
        });
    });

    test('should return empty array and status 204 if delete is successful', async () => {
        const account = await testHelpers.createTestAccount();

        const res = await request(server)
            .delete(endpoints.account + `/${account!.id}`)
            .set('x-master-key', config.master_key)
            .send();

        expect(res.status).toBe(204);
    });
});
