import { accountService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('accountService.getUserAccounts', () => {
    afterEach(async () => {
        testHelpers.cleanDatabase();
    });

    test('should return accounts array of users accounts if exists', async () => {
        const user = await testHelpers.createTestUser();

        const newAccounts = await testHelpers.createTwoTestAccounts(
            user.id as string,
        );

        const userAccounts = await accountService.getUserAccounts(
            user.id as string,
        );

        expect(userAccounts.length).toBe(2);
        expect(userAccounts[0]).toHaveProperty(
            'account_number',
            newAccounts[0].account_number,
        );
        expect(userAccounts[1]).toHaveProperty(
            'account_number',
            newAccounts[1].account_number,
        );
    });

    test('should return empty array if user doesnt have accounts', async () => {
        const user = await testHelpers.createTestUser();

        const userAccounts = await accountService.getUserAccounts(user.id);

        expect(userAccounts.length).toBe(0);
    });
});
