import express from 'express';

import config from './config';
import logger from './utils/logger';

const app = express();

const startServer = async () => {
    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, () => {
        logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
    `);
    }).on('error', (err) => {
        logger.error(err);
        process.exit(1);
    });
};

startServer();

export default app;
