import { IAccount } from '../../../src/interfaces';
import { accountService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('accountService.createAccount', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should create a new user account and return the account', async () => {
        const user = await testHelpers.createTestUser();

        const accountData: Partial<IAccount> = {
            user_id: user!.id,
            account_name: 'Jacques Ikot',
            account_bank: '101',
            account_number: '1234567890',
            created_at: new Date().toISOString(),
        };

        const newAccount = await accountService.createAccount(accountData);

        expect(newAccount).toHaveProperty('user_id', user!.id);
        expect(newAccount).toHaveProperty(
            'account_name',
            accountData.account_name,
        );
    });
});
