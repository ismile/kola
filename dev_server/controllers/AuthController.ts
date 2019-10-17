import Controller from "../utils/core/Controller";
import {Context} from 'koa';
import AuthService from "../services/AuthService";

class AuthController extends Controller {
  async login(ctx:Context, next:Promise<any>) {
    try {
      let token = await AuthService.login(ctx.request.body)
      ctx.session.authUser = token;
      ctx.body = token;
    } catch (e) {
      ctx.throw(this.status.BAD_REQUEST, e);
    }
  }

  async logout(ctx:Context, next:Promise<any>) {
    ctx.session.authUser = null;
    ctx.body             = {};
  }
}

export default new AuthController()
