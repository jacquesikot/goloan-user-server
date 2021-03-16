import { userService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('userService.getUserById', () => {
    beforeEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should return user if valid id is entered', async () => {
        const user = await testHelpers.createTestUser();

        const returnedUser = await userService.getUserById(user!.id);

        expect(returnedUser).toHaveProperty('first_name', user!.first_name);
    });
});
