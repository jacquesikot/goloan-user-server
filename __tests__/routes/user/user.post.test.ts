import request from 'supertest';
import express from 'express';

import config from '../../../src/config';
import { userService } from '../../../src/loaders/dependencyInjector';
import { IUser } from '../../../src/interfaces';
import endpoints from '../../../src/api/endpoints';
import testHelpers from '../../../src/testHelpers';

let server: any;

describe(`${endpoints.user} - POST`, () => {
    beforeEach(async () => {
        const app = express();
        await require('../../../src/loaders').default({ expressApp: app });
        server = app.listen(config.port);
    });
    afterEach(async () => {
        await testHelpers.cleanDatabase();
        await server.close();
    });

    const data: IUser = {
        first_name: 'jacques',
        last_name: 'ikot',
        phone_number: '23409059032943',
        email: 'jimmy@gmail.com',
        password: '123456',
        pin: '1234',
        gender: 'male',
        bvn: '1234567890',
        user_type: '1',
    };

    test('should return 400 if validation fails', async () => {
        const data = {
            first_name: 'jimmy',
            last_name: 'jimmy',
        };

        const res = await request(server).post(endpoints.user).send(data);

        expect(res.status).toBe(400);
    });

    test('should return 400 if user exists', async () => {
        await userService.createUser(data);

        const res = await request(server).post(endpoints.user).send(data);

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({
            message: `User with ${data.email} is already registered`,
            code: 400,
        });
    });

    test('should create new user and status 201 and created user', async () => {
        const res = await request(server).post(endpoints.user).send(data);

        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('first_name', data.first_name);
    });
});
