import { IUser } from '../interfaces';
import logger from '../utils/logger';
import prisma from '../prismaClient';

export const createUser = async (user: IUser) => {
    const {
        first_name,
        last_name,
        phone_number,
        email,
        gender,
        bvn,
        user_type,
    } = user;

    try {
        const user = prisma.users.create({
            data: {
                first_name,
                last_name,
                phone_number,
                email,
                gender,
                bvn,
                user_type,
                created_at: new Date().toISOString(),
            },
        });

        return user;
    } catch (error) {
        logger.error(error);
    }
};

export const checkIfUserExists = async (user: IUser) => {
    try {
        const { email } = user;

        const foundUser = await prisma.users.findUnique({
            where: {
                email,
            },
        });

        if (!foundUser) return false;
        return true;
    } catch (error) {
        logger.error(error);
    }
};
