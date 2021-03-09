import { IAccount, IUser } from '../../../src/interfaces';
import {
    accountService,
    userService,
    prisma,
} from '../../../src/loaders/dependencyInjector';

describe('userAccount.createAccount', () => {
    afterEach(async () => {
        await prisma.user_account.deleteMany({});
        await prisma.users.deleteMany({});
        await prisma.$disconnect();
    });

    test('should create a new user account and return the account', async () => {
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

        expect(newAccount).toHaveProperty('user_id', user.id);
        expect(newAccount).toHaveProperty(
            'account_name',
            accountData.account_name,
        );
    });
});
