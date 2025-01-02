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

export const validateLorry = (data)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().integer().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required(),
        type: Joi.string().required(),
        quantity: Joi.number().integer().required()
    });

    return schema.validate(data)
}

export const validateReview = (data)=>{
    const schema = Joi.object({
        first_name: Joi.string().required().pattern(new RegExp('^[a-zA-Z]+[a-zA-Z]$')),
        rating: Joi.number().required(),
        text: Joi.string().required(),
        date: Joi.date().required(),
    });

    return schema.validate(data)
}

export const validateTransaction = (data)=>{
    const schema = Joi.object({
        amount: Joi.number(),
        lorry_id: Joi.number().required(),
        date: Joi.date().required(),
    });

    return schema.validate(data)
}