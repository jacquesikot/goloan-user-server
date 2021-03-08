import nodemailer from 'nodemailer';

import config from '../config';
import logger from '../loaders/logger';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jacquesikot@gmail.com',
        pass: 'jacquesikot5555',
    },
});

const mailOptions = {
    from: config.email,
    to: 'jacquesikot@icloud.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
};

export const sendWelcomeMail = () => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger.error(error);
        } else {
            logger.info('Email sent: ' + info.response);
        }
    });
};
