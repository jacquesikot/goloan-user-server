import expressLoader from './express';
import prismaLoader from './prisma';
import logger from './logger';
// import dependencyInjectorLoader from './dependencyInjector';

export default async ({ expressApp }: any) => {
    await prismaLoader();
    logger.info('✌️ Prisma loaded and connected!');

    // await dependencyInjectorLoader();
    // logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp });
    logger.info('✌️ Express loaded');
};
