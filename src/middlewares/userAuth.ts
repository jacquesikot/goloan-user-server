import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { logger } from '../loaders/dependencyInjector';
import config from '../config';
import { errorMessage, httpHeaders } from '../constants';
import { error } from '../utils';

const userAuth = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers[httpHeaders.authToken];
    if (!token) {
        const code = 400;
        res.status(code);
        res.json(error.generic(errorMessage.noAuthToken, code));
        return;
    }
    try {
        const decoded = jwt.verify(token, config.jwt_key);
        req.user = decoded;
        next();
        return;
    } catch (error) {
        const code = 401;
        logger.error(error);
        res.status(code);
        res.json(error.generic(errorMessage.invalidToken, code));
        return;
    }
};

export default userAuth;
