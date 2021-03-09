import logger from '../loaders/logger';

export const sendWelcomeMail = () => {
    setTimeout(() => {
        logger.info('Email Sent');
    }, 10000);
};
