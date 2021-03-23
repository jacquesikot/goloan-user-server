import Mailgun from 'mailgun-js';
import events from 'events';

import config from '../config';
import LoggerInstance from './logger';
import { PrismaClient } from '@prisma/client';
import {
    userService,
    accountService,
    cardService,
    authService,
    mailService,
} from '../services';

const mailgunInstance = new Mailgun({
    apiKey: config.mailgun_api_key,
    domain: config.mailgun_domain,
});

const mailServiceInstance = mailService(LoggerInstance, mailgunInstance);
const PrismaInstance = new PrismaClient();
const userEventInstance = new events.EventEmitter();
const userServiceInstance = userService(
    LoggerInstance,
    PrismaInstance,
    userEventInstance,
);
const accountServiceInstance = accountService(LoggerInstance, PrismaInstance);
const cardServiceInstance = cardService(LoggerInstance, PrismaInstance);
const authServiceInstance = authService(LoggerInstance);

export {
    PrismaInstance as prisma,
    userServiceInstance as userService,
    LoggerInstance as logger,
    userEventInstance as userEvent,
    accountServiceInstance as accountService,
    cardServiceInstance as cardService,
    authServiceInstance as authService,
    mailServiceInstance as mailService,
};
