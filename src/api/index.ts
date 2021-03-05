import { Router } from 'express';

import { home, users } from './routes';

export default () => {
    const app = Router();
    home(app);
    users(app);

    return app;
};
