// import request from 'supertest';
// import express from 'express';

// import config from '../../../src/config';
// import endpoints from '../../../src/api/endpoints';
// import testHelpers from '../../../src/testHelpers';

// let server: any;

// describe(`${endpoints.user} - GET`, () => {
//     beforeEach(async () => {
//         const app = express();
//         await require('../../../src/loaders').default({ expressApp: app });
//         server = app.listen(config.port);
//     });
//     afterEach(async () => {
//         await testHelpers.cleanDatabase();
//         await server.close();
//     });

//     test('should return 400 and error message if no user found', async () => {
//         const fake_user_id = '4235873y6589y';

//         const res = await request(server)
//             .get(endpoints.user + `/${fake_user_id}`)
//             .set('x-master-key', config.master_key);

//         // expect(res.body).toMatchObject({
//         //     message: `User with given id does not exist`,
//         //     code: 400,
//         // });

//         expect(res.status).toBe(400);
//     });

//     test('should return user cards if correct id is passed', async () => {
//         const user = await testHelpers.createTestUser();

//         const res = await request(server)
//             .get(endpoints.user + `/${user.id}`)
//             .set('x-master-key', config.master_key);

//         expect(res.body.length).toBeGreaterThan(1);
//         expect(res.body).toHaveProperty('first_name', user.first_name);
//     });
// });
