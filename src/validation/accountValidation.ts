import * as Joi from 'joi';

import { IAccount } from '../interfaces';

const validateAccount = (account: Partial<IAccount>) => {
    const schema = Joi.object({
        user_id: Joi.string().min(10).required(),
        account_name: Joi.string().min(3).required(),
        account_bank: Joi.string().min(3).max(3).required(),
        account_number: Joi.string().min(10).max(10).required(),
    });

    return schema.validate(account);
};

export default validateAccount;
