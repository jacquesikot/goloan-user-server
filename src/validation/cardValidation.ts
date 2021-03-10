import * as Joi from 'joi';

import { ICard } from '../interfaces';

const cardValidation = (account: Partial<ICard>) => {
    const schema = Joi.object({
        user_id: Joi.string().min(10).required(),
        card_name: Joi.string().min(3).required(),
        card_number: Joi.string().min(16).max(16).required(),
        card_cvv: Joi.string().min(3).max(3).required(),
        card_expiry: Joi.string().min(4).max(4).required(),
    });

    return schema.validate(account);
};

export default cardValidation;
