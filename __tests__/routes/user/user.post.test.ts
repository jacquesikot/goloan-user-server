// import request from 'supertest';

// import prisma from '../../../src/prismaClient';

// let server: any;

// describe('/v1/users - POST', () => {
//     beforeEach(() => {
//         server = require('../../../src/app');
//     });
//     afterEach(async () => {
//         await prisma.users.deleteMany({});
//     });

//     test('should return 400 if validation fails', async () => {
//         const data = {
//             first_name: 'jimmy',
//             last_name: 'jimmy',
//         };

//         const res = await request(server).post('/v1/users').send(data);

//         expect(res.status).toBe(400);
//     });
// });
