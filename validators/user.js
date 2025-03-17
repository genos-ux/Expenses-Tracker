import Joi from "joi";

export const userValidator = Joi.object({
  userName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");
