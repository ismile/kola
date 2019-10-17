import ApiService from "../utils/core/MongoService";
import User from '../models/User'

class UserService extends ApiService {
  model = User
}

export default new UserService()
