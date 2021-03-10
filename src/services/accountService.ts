import { IAccount } from '../interfaces';

const accountService = (logger: any, prisma: any) => {
    const checkIfAccountExists = async (account_id: string) => {
        try {
            const account = await prisma.user_account.findUnique({
                where: {
                    id: account_id,
                },
            });
            if (account) return true;
        } catch (error) {
            logger.error(error);
        }
    };

    const createAccount = async (account: Partial<IAccount>) => {
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

    const deleteAccount = async (account_id: string) => {
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

    const getUserAccounts = async (user_id: string) => {
        try {
            const userAccounts = await prisma.user_account.findMany({
                where: {
                    user_id,
                },
            });
            if (userAccounts.length > 0) return userAccounts;
            return [];
        } catch (error) {
            logger.error(error);
        }
    };

    return {
        createAccount,
        deleteAccount,
        checkIfAccountExists,
        getUserAccounts,
    };
};

export default accountService;
