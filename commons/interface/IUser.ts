import * as Joi from '@hapi/joi';

export interface IUser {
  _id     : String,
  username: String,
  password: String,
  name    : String,
  role    : String,
  email   : String
}

export const VUser = Joi.object({
  _id     : Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  name    : Joi.string().required(),
  role    : Joi.string(),
  email   : Joi.string().email().required()
})

export const VToken = Joi.object({
  data: VUser,
  accessToken: Joi.string(),
  refreshToken: Joi.string()
})

export default IUser;
