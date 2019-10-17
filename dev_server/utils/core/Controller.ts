/**
 * @author Ismail Sunny
 * @email [ismiletea@gmail.com]
 * @create date 2018-11-28 14:43:09
 * @modify date 2018-11-28 14:43:09
 * @desc [description]
*/

import * as httpStatus from 'http-status-codes';
import logger from '../../configs/logger';
import Router from 'koa-router';
import {BaseContext} from 'koa';
import Joi from '@hapi/joi';
import { KoaJoiValidator, IKoaJoiValidatorOptions } from 'koa2-joi-validator';
import jwt from '../../configs/jwt';
import {Context} from 'koa';
export const joi = Joi;
import autobind from 'auto-bind'

export class Controller {
  status              = httpStatus
  log                 = logger;
  Joi                 = Joi;
  jwt                 = jwt.auth
  validator           = KoaJoiValidator

  constructor() {
    autobind(this)
  }
}

export default Controller;
