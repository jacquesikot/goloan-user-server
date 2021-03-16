import { Router } from 'express';

import { home, users, account, card, auth } from './routes';

export default () => {
    const app = Router();

    home(app);
    users(app);
    account(app);
    card(app);
    auth(app);

    return app;
};
