const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().uri().allow("",null).optional(),        
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()  
});

// module.exports.reviewSchema = Joi.object({
//     review : Joi.object({
//         rating: Joi.number().required(),
//         comment: Joi.string().required(),
//     }).required(),
// })

// Schema for validating reviews
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
      rating: Joi.number().min(1).max(5).required().messages({
        'number.base': 'Rating must be a number.',
        'number.min': 'Rating must be at least 1.',
        'number.max': 'Rating must be at most 5.',
      }),
      comment: Joi.string().trim().required().messages({
        'string.empty': 'Comment is required.',
      }),
    }).required(),
  });

// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         image: Joi.any(),
//         price: Joi.number().min(0).required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//     }).required()  
// });

// const Joi = require('joi');

// const listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         price: Joi.number().required(),
//         image: Joi.object({
//             URL: Joi.string().uri().optional()
//         }).optional()
//     }).required()
// });

// module.exports = { listingSchema };
