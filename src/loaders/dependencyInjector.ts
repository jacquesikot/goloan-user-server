import { Container } from 'typedi';
import LoggerInstance from './logger';
import { PrismaClient } from '@prisma/client';

export default () => {
    try {
        const PrismaInstance = new PrismaClient();

        Container.set('logger', LoggerInstance);
        Container.set('prisma', PrismaInstance);
    } catch (error) {
        LoggerInstance.error(
            '🔥 Error on dependency injector loader: %o',
            error,
        );
    }
};
