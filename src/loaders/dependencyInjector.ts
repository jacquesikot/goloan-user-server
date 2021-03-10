import LoggerInstance from './logger';
import { PrismaClient } from '@prisma/client';
import { userService, accountService, cardService } from '../services';

const PrismaInstance = new PrismaClient();
const userEventInstance = new (require('events').EventEmitter)();
const userServiceInstance = userService(
    LoggerInstance,
    PrismaInstance,
    userEventInstance,
);
const accountServiceInstance = accountService(LoggerInstance, PrismaInstance);
const cardServiceInstance = cardService(LoggerInstance, PrismaInstance);

export {
    PrismaInstance as prisma,
    userServiceInstance as userService,
    LoggerInstance as logger,
    userEventInstance as userEvent,
    accountServiceInstance as accountService,
    cardServiceInstance as cardService,
};
