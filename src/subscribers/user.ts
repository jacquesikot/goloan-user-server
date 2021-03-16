import events from './events';
import { userEvent, logger } from '../loaders/dependencyInjector';

userEvent.on(events.user.signUp, function () {
    logger.info('reached');
});
