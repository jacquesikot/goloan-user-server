import winston from 'winston';
import { PrismaClient, Prisma } from '../loaders/prisma';

interface IServiceDependencies {
    logger: winston.Logger;
    prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        | boolean
        | ((error: Error) => Error)
        | Prisma.RejectPerOperation
        | undefined
    >;
}

export default IServiceDependencies;
