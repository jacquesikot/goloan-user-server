import request from 'supertest';
import express from 'express';

import prisma from '../../../src/prismaClient';
import config from '../../../src/config';
import { createUser } from '../../../src/services';
import { IUser } from '../../../src/interfaces';

let server: any;

describe('/v1/users - POST', () => {
    beforeEach(async () => {
        const app = express();
        await require('../../../src/loaders').default({ expressApp: app });
        server = app.listen(config.port);
    });
    afterEach(async () => {
        await prisma.users.deleteMany({});
        await server.close();
    });

    const data: IUser = {
        first_name: 'jacques',
        last_name: 'ikot',
        phone_number: '23409059032943',
        email: 'jimmy@gmail.com',
        gender: 'male',
        bvn: '1234567890',
        user_type: '1',
    };

    test('should return 400 if validation fails', async () => {
        const data = {
            first_name: 'jimmy',
            last_name: 'jimmy',
        };

        const res = await request(server).post('/v1/users').send(data);

        expect(res.status).toBe(400);
    });

    test('should return 400 if user exists', async () => {
        await createUser(data);

        const res = await request(server).post('/v1/users').send(data);

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({
            message: `User with ${data.email} is already registered`,
            code: 400,
        });
    });

    test('should create new user and return user', async () => {
        const res = await request(server).post('/v1/users').send(data);

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('first_name', data.first_name);
    });
});
