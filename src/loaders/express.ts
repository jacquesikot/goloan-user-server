import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from '../api';
import logger from './logger';

export default ({ app }: { app: express.Application }) => {
    // Health Check endpoints
    app.get('/status', (_req, res) => {
        res.status(200).end();
    });
    app.head('/status', (_req, res) => {
        res.status(200).end();
    });

    // Middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        logger.info('✌️ Morgan enabled');
    }

    // Routes
    app.use('/', routes());

    // Errors
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.status(500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });

    process.on('uncaughtException', (exception) => {
        logger.error(exception);
        process.exit(1);
    });

    process.on('unhandledRejection', (exception) => {
        logger.error(exception);
        process.exit(1);
    });
};
