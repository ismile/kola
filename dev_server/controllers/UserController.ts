import ApiController from "../utils/core/ApiController";
import UserService from '../services/UserService'

class UserController extends ApiController {
  service = UserService
}

export default new UserController()
