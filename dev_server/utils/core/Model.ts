/**
 * @author Ismail Sunny
 * @email [ismiletea@gmail.com]
 * @create date 2018-11-28 14:42:33
 * @modify date 2018-11-28 14:42:33
 * @desc [description]
*/

import dbConfig from "../../configs/db";
import {ObjectId} from 'mongodb';
import {_} from '../libs'

export class Model {
  name = ''

  type = {
    ObjectId: (v:string) => {
      if(!_.isEmpty(v)) {
        return new ObjectId(v)
      } else {
        return new ObjectId()
      }
    }
  }

  collection() {
    return dbConfig.db.collection(this.name)
  }

  async transform(data:any) {
    data._id = this.type.ObjectId(data._id);
    return data
  }

  async transformAll(list:Array<any>) {
    return list.map(async data => {
      data = await this.transform(data)
      return data
    });
  }

}

export default Model;
