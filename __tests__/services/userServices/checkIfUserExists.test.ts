import { prisma } from '../../../src/loaders/prisma';
import { IUser } from '../../../src/interfaces';
import { userService } from '../../../src/loaders/dependencyInjector';

describe('userService.checkIfUserExists', () => {
    afterEach(async () => {
        await prisma.users.deleteMany({});
        await prisma.$disconnect();
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

    test('should return true if user exists', async () => {
        await userService.createUser(data);

        const existingUser = await userService.checkIfUserExists(data);

        expect(existingUser).toBe(true);
    });

    test('should return false if user doesnt exists', async () => {
        const existingUser = await userService.checkIfUserExists(data);

        expect(existingUser).toBe(false);
    });
});
