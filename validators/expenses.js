import Joi from "joi";

export const userValidator = Joi.object({
  Amount: Joi.string(),
  category: Joi.string().valid('electronics', 'fashion', 'food', 'sports').required(),
  date: Joi.date()
  
})
