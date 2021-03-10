import { accountService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('accountService.deleteAccount', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should delete a user account and return true if account exists', async () => {
        const newAccount = await testHelpers.createTestAccount();

        const deletedAccount = await accountService.deleteAccount(
            newAccount.id,
        );

        expect(deletedAccount).toBe(true);
    });
});
