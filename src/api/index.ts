import { Router } from 'express';

import { home, users, account, card } from './routes';

export default () => {
    const app = Router();

    home(app);
    users(app);
    account(app);
    card(app);

    return app;
};
