import Model from "../utils/core/Model";
import {hash, decodeBase64, compare} from 'bcryptjs';
import {_} from '../utils/libs'

class User extends Model {

  name='t_user'

  async transform(data:any) {
    await super.transform(data);
    data.password = await this.hashPassword(data.password);

    return data
  }

  async comparePassword(obj:any, password:string) {
    try {
      let valid = await compare(password, obj.password)
      return Promise.resolve(valid);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async hashPassword(v:string) {
    if (_.isEmpty(v)) {
      return Promise.reject('value is empty');
    } else {
      let hashed = await hash(v, 10);

      return Promise.resolve(hashed);
    }
  }


}

export default new User();
