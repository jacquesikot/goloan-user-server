import { Request, Response, NextFunction } from 'express';
import { error } from '../utils';
import config from '../config';
import { errorMessage, httpHeaders } from '../constants';

const masterAuth = (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers[httpHeaders.masterKey];

    if (!key) {
        const code = 401;
        res.status(code);
        res.json(error.generic(errorMessage.noMasterKey, code));
        return;
    }

    if (key === config.master_key) {
        return next();
    } else {
        const code = 400;
        res.status(code);
        res.json(error.generic(errorMessage.wrongMasterKey, code));
        return;
    }
};

export default masterAuth;
