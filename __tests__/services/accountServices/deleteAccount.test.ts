import { IUser, IAccount } from '../../../src/interfaces';
import {
    accountService,
    userService,
    prisma,
} from '../../../src/loaders/dependencyInjector';

describe('userAccount.deleteAccount', () => {
    afterEach(async () => {
        await prisma.user_account.deleteMany({});
        await prisma.users.deleteMany({});
        await prisma.$disconnect();
    });

    test('should delete a user account and return true if account exists', async () => {
        const userData: IUser = {
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

        const user = await userService.createUser(userData);

        const accountData: Partial<IAccount> = {
            user_id: user.id,
            account_name: 'Jacques Ikot',
            account_bank: '101',
            account_number: '1234567890',
            created_at: new Date().toISOString(),
        };

        const newAccount = await accountService.createAccount(accountData);

        const deletedAccount = await accountService.deleteAccount(
            newAccount.id,
        );

        expect(deletedAccount).toBe(true);
    });

    test('should return undefined if account_id is not correct', async () => {
        const fake_account_id = '123456gd662793243';

        const deletedAccount = await accountService.deleteAccount(
            fake_account_id,
        );

        expect(deletedAccount).toBe(undefined);
    });
});
