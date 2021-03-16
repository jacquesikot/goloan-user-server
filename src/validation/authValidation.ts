import * as Joi from 'joi';
import { ILogin } from '../interfaces';

const authValidation = (login: ILogin) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });

    return schema.validate(login);
};

export default authValidation;
