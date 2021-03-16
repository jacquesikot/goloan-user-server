import axios from 'axios';

import config from '../config';

const mailService = (logger: any, mailer: any) => {
    const testMailchimp = async () => {
        const response = await axios.get(`${config.mailchimp_url}/`, {
            headers: {
                Authorization: `Bearer ${config.mailchimp_api_key}`,
            },
        });
        return response.data;
    };

    const welcomeMail = (receiverEmail: string) => {
        const data = {
            from: config.email,
            to: receiverEmail,
            subject: 'Welcome to Goloan Services',
            html: 'Hello from goloan',
        };

        mailer.messages().send(data, (error: Error, body: any) => {
            if (error) {
                logger.error(error);
            } else {
                logger.info('Email Sent', body);
            }
        });
    };

    return {
        welcomeMail,
        testMailchimp,
    };
};

export default mailService;
