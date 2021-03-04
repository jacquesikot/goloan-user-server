import { Router } from 'express';

import { home } from './routes';

export default () => {
    const app = Router();
    home(app);

    return app;
};
