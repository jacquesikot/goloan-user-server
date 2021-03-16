import express from 'express';
import config from '../config';

import { IUser, IAccount, ICard } from 'src/interfaces';
import {
    userService,
    accountService,
    cardService,
    authService,
    prisma,
} from '../loaders/dependencyInjector';

const userData1: IUser = {
    first_name: 'jacques',
    last_name: 'ikot',
    phone_number: '23409059032943',
    email: 'jimmyjohnson@gmail.com',
    password: '123456',
    pin: '1234',
    gender: 'male',
    bvn: '1234567890',
    user_type: '1',
};

// {
//     "first_name": "jacques",
//     "last_name": "ikot",
//     "phone_number": "23409059032943",
//     "email": "jacquesikot@gmail.com",
//     "password": "123456",
//     "pin": "1234",
//     "gender": "male"',
//     "bvn": "1234567890",
//     "user_type": "1"
// }

const createTestUser = async () => {
    const testUser = await userService.createUser(userData1);
    return testUser;
};

const createTestAccount = async () => {
    const user = await createTestUser();

    const accountData: Partial<IAccount> = {
        user_id: user?.id,
        account_name: 'Jacques Ikot',
        account_bank: '101',
        account_number: '1234567890',
    };

    const testAccount = await accountService.createAccount(accountData);
    return testAccount;
};

const createTwoTestAccounts = async (user_id: string) => {
    const accountData1: Partial<IAccount> = {
        user_id: user_id,
        account_name: 'Jacques Ikot',
        account_bank: '101',
        account_number: '1234567890',
    };

    const accountData2: Partial<IAccount> = {
        user_id: user_id,
        account_name: 'Jacques Ikot',
        account_bank: '101',
        account_number: '1234567890',
    };

    const testAccount1 = await accountService.createAccount(accountData1);
    const testAccount2 = await accountService.createAccount(accountData2);

    return [testAccount1, testAccount2];
};

const createTestCard = async () => {
    const user = await createTestUser();

    const cardData: Partial<ICard> = {
        user_id: user?.id,
        card_name: 'Jimmy Falon',
        card_number: '1234567890123',
        card_cvv: '234',
        card_expiry: '2454',
    };

    const newTestCard = await cardService.createCard(cardData);

    return newTestCard;
};

const createTwoTestCards = async (user_id: string) => {
    const cardData1: Partial<ICard> = {
        user_id,
        card_name: 'Jimmy Falon',
        card_number: '1234567890123',
        card_cvv: '234',
        card_expiry: '2454',
    };

    const cardData2: Partial<ICard> = {
        user_id,
        card_name: 'Jimmy Falon',
        card_number: '1234567890123',
        card_cvv: '234',
        card_expiry: '2454',
    };

    const newCard1 = await cardService.createCard(cardData1);
    const newCard2 = await cardService.createCard(cardData2);

    return [newCard1, newCard2];
};

const getAuthToken = async () => {
    const user = await createTestUser();

    const userObject = await userService.findUserByEmail(user!.email);

    const token = await authService.generateAuthToken(userObject);

    return {
        token,
        userObject,
    };
};

const startTestServer = async () => {
    const app = express();
    await require('../../../src/loaders').default({ expressApp: app });
    const server = app.listen(config.port);
    return server;
};

const cleanDatabase = async () => {
    await prisma.user_account.deleteMany({});
    await prisma.user_card.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.$disconnect();
};

export default {
    createTestUser,
    createTestAccount,
    createTwoTestAccounts,
    createTestCard,
    createTwoTestCards,
    getAuthToken,
    cleanDatabase,
    startTestServer,
};
