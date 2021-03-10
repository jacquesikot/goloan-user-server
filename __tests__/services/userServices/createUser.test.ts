import { IUser } from '../../../src/interfaces';
import { userService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('userService.createUser', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should create a new user and return the user', async () => {
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
        const user = await userService.createUser(data);

        expect(user).toHaveProperty('first_name', data.first_name);
        expect(user).toHaveProperty('last_name', data.last_name);
        // expect(user).toHaveProperty('phone_number', data.phone_number);
        // expect(user).toHaveProperty('email', data.email);
        // expect(user).toHaveProperty('gender', data.gender);
        // expect(user).toHaveProperty('bvn', data.bvn);
        // expect(user).toHaveProperty('user_type', data.user_type);
    });
});
