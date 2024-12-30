import Joi from 'joi';
export const validateUser = (data)=>{
    const schema = Joi.object({
        first_name: Joi.string().required().pattern(new RegExp('^[a-zA-Z]+[a-zA-Z]$')),
        last_name: Joi.string().required().pattern(new RegExp('^[a-zA-Z]+[a-zA-Z]$')),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    return schema.validate(data)
}