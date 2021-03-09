import events from './events';
import { userEvent } from '../loaders/dependencyInjector';

userEvent.on(events.user.signUp, function () {
    // logger.info('Welcome Email started!');
});

export default userEvent;
