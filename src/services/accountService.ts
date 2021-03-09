import { IAccount } from '../interfaces';
import { Prisma, user_account } from '../loaders/prisma';

const accountService = (logger: any, prisma: any) => {
    const checkIfAccountExists = async (account_id: string) => {
        try {
            const account = prisma.user_account.findUnique({
                where: {
                    id: account_id,
                },
            });

            if (!account) return false;
            return true;
        } catch (error) {
            logger.error(error);
        }
    };

    const createAccount = async (
        account: Partial<IAccount>,
    ): Promise<Prisma.Prisma__user_accountClient<user_account> | undefined> => {
        const { user_id, account_name, account_bank, account_number } = account;
        try {
            const newAccount = await prisma.user_account.create({
                data: {
                    user_id,
                    account_name,
                    account_bank,
                    account_number,
                    created_at: new Date().toISOString(),
                },
            });
            return newAccount;
        } catch (error) {
            logger.error(error);
        }
    };

    const deleteAccount = async (
        account_id: string,
    ): Promise<boolean | undefined> => {
        try {
            await prisma.user_account.delete({
                where: {
                    id: account_id,
                },
            });
            return true;
        } catch (error) {
            logger.error(error);
        }
    };

    return {
        createAccount,
        deleteAccount,
        checkIfAccountExists,
    };
};

export default accountService;
