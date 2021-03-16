import { accountService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('accountService.checkIfAccountExists', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should return true if account exists', async () => {
        const newAccount = await testHelpers.createTestAccount();

        const accountCheck = await accountService.checkIfAccountExists(
            newAccount!.id,
        );

        expect(accountCheck).toBe(true);
    });
});
