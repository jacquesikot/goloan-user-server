import prisma from '../../../src/prismaClient';
import { IUser } from '../../../src/interfaces';
import { checkIfUserExists, createUser } from '../../../src/services';

describe('check if user exists', () => {
    afterEach(async () => {
        await prisma.users.deleteMany({});
        await prisma.$disconnect();
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

    test('should return true if user exists', async () => {
        await createUser(data);

        const existingUser = await checkIfUserExists(data);

        expect(existingUser).toBe(true);
    });

    test('should return false if user doesnt exists', async () => {
        const existingUser = await checkIfUserExists(data);

        expect(existingUser).toBe(false);
    });
});
