import Service from "../utils/core/Service";
import {_} from '../utils/libs'
import { exceptions } from "winston";
import User from "../models/User";
import jwt from "../configs/jwt";

class AuthService extends Service {

  async login(param:any) {
    if (_.isEmpty(param.username) || _.isEmpty(param.password)) {
      throw new Error(this.status.BAD_REQUEST + ` - Username and password is required`)
    } else {

      let user = (await User.collection().find({
        'username': param.username
      }).limit(1).toArray())[0];

      if (_.isEmpty(user)) throw new Error(this.status.BAD_REQUEST + ` - Username ${param.username} cannot be found`);
      let isPass = await User.comparePassword(user, param.password);
      if (!isPass) throw new Error(this.status.BAD_REQUEST + ` - Username and password doesn't match`);
      let userToken = await jwt.generateTokens(user);

      return userToken
    }
  }
}

export default new AuthService()
