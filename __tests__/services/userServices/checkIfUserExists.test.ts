import { userService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('userService.checkIfUserExists', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should return true if user exists', async () => {
        const user = await testHelpers.createTestUser();

        const existingUser = await userService.checkIfUserExists(
            user.email as string,
        );

        expect(existingUser).toBe(true);
    });

    test('should return false if user doesnt exists', async () => {
        const existingUser = await userService.checkIfUserExists(
            'jim@gmail.com',
        );

        expect(existingUser).toBe(false);
    });
});
