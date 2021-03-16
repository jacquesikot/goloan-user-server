import 'reflect-metadata';

require('dotenv').config();

import express from 'express';

import config from './config';
import logger from './loaders/logger';

const startServer = async () => {
    const app = express();

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
