import {
    PrismaClient,
    Prisma,
    users,
    user_account,
    user_card,
} from '@prisma/client';

import logger from './logger';

const prisma = new PrismaClient();

export default async () => {
    try {
        const connection = await prisma.$connect();
        return connection;
    } catch (error) {
        logger.error('Postgres loading Error');
        throw error;
    }
};

export { prisma, Prisma, users, user_account, user_card, PrismaClient };
