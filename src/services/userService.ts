import bcrypt from 'bcrypt';

import { IUser } from '../interfaces';
import { Prisma, users } from '../loaders/prisma';
import { events } from '../subscribers';

const userService = (logger: any, prisma: any, userEvent: any) => {
    const hashValue = async (value: string): Promise<string | undefined> => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedValue = await bcrypt.hash(value, salt);
            return hashedValue;
        } catch (error) {
            logger.error(error);
        }
    };

    const validatePassword = async (
        givenPassword: string,
        userPassword: string,
    ): Promise<boolean | undefined> => {
        try {
            const validPassword = await bcrypt.compare(
                givenPassword,
                userPassword,
            );
            if (!validPassword) return false;
            return true;
        } catch (error) {
            logger.error(error);
        }
    };

    const createUser = async (
        user: IUser,
    ): Promise<Prisma.Prisma__usersClient<users> | undefined> => {
        const {
            first_name,
            last_name,
            phone_number,
            email,
            gender,
            bvn,
            user_type,
            password,
            pin,
        } = user;

        const safePassword = (await hashValue(password))!.toString();
        const safePin = (await hashValue(pin))!.toString();

        try {
            const user = prisma.users.create({
                data: {
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    password: safePassword,
                    pin: safePin,
                    gender,
                    bvn,
                    user_type,
                    created_at: new Date().toISOString(),
                },
            });

            userEvent.emit(events.user.signUp);

            return user;
        } catch (error) {
            logger.error(error);
        }
    };

    const checkIfUserExists = async (
        user: IUser,
    ): Promise<boolean | undefined> => {
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

    return {
        hashValue,
        validatePassword,
        createUser,
        checkIfUserExists,
    };
};

export default userService;
