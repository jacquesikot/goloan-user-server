import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: parseInt(process.env.PORT!, 10),
    email: 'jacquesikot@gmail.com',
    email_password: process.env.EMAIL_PASSWORD,
    master_key: process.env.MASTER_KEY ? process.env.MASTER_KEY : '',
    jwt_key: process.env.JWT_KEY ? process.env.JWT_KEY : '',
    mailgun_api_key: process.env.MAILGUN_API_KEY
        ? process.env.MAILGUN_API_KEY
        : '',
    mailgun_domain: process.env.MAILGUN_DOMAIN
        ? process.env.MAILGUN_DOMAIN
        : '',
    mailchimp_api_key: process.env.MAILCHIMP_API_KEY
        ? process.env.MAILCHIMP_API_KEY
        : '',
    mailchimp_url: process.env.MAILCHIMP_URL ? process.env.MAILCHIMP_URL : '',
};
