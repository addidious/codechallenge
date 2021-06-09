const Joi = require('joi');

const userValidation = (data)=>{
    const schema = Joi.object({

        name:Joi.string()
                .min(5)
                .required(),
    
        password:Joi.string()
                    .min(6)
                    .required(),
    
    });
    return schema.validate(data);
}

const inventoryValidation = (data)=>{
    const schema = Joi.object({

        itemName:Joi.string()
                    .required(),
    
        quantity:Joi.number()
                    .required(),

        _id:Joi.string()
               .allow(null),
    
    });
    return schema.validate(data);
}

module.exports = {
    userValidation,
    inventoryValidation,
};
