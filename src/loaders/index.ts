import expressLoader from './express';
import postgresLoader from './postgres';
import logger from '../utils/logger';

export default async ({ expressApp }: any) => {
    await postgresLoader();
    logger.info('✌️ Postgres loaded and connected!');

    await expressLoader({ app: expressApp });
    logger.info('✌️ Express loaded');
};
