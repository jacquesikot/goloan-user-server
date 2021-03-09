import { IAccount, IUser } from '../../../src/interfaces';
import {
    accountService,
    userService,
    prisma,
} from '../../../src/loaders/dependencyInjector';

describe('accountService.checkIfAccountExists', async () => {
    afterEach(async () => {
        await prisma.user_account.deleteMany({});
        await prisma.users.deleteMany({});
        await prisma.$disconnect();
    });

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

    test('should return true if account exists', async () => {
        const accountCheck = await accountService.checkIfAccountExists(
            newAccount.id,
        );

        expect(accountCheck).toBe(true);
    });

    test('should return false if account doesnt exists', async () => {
        const fake_account_id = 'asvuaqvdfhyafd6afvd';

        const accountCheck = await accountService.checkIfAccountExists(
            fake_account_id,
        );

        expect(accountCheck).toBe(false);
    });
});
