// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         image: Joi.object({
//             URL: Joi.string().uri().allow("", null)
//         }).optional(),
//         price: Joi.number().min(0).required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//     }).required()  
// });


const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.any(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()  
});
