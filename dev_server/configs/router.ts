import Koa from 'koa';
import Router from 'koa-router';
import jwt from './jwt';
import logger from './logger';
// @ts-ignore
import config from '../application.config';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

var routerConfig = {
  router    : new Router(),
  api : new Router(),

  init(app:Koa) {
    const router     = this.router     = new Router();
    const api        = this.apiRouter  = new Router();

    // protect api router with jwt
    // apiRouter.use(jwt.auth);
    router.post('/login',                               AuthController.login)
    router.post('/logout',                              AuthController.logout)
    // api router
    api.get   ('/user',                                 UserController.findAll)
    api.post  ('/user',                                 UserController.create)
    api.post  ('/user-page',                            UserController.findPage)
    api.get   ('/user/:id',                             UserController.findOne)
    api.put   ('/user',                                 UserController.update)
    api.delete('/user',                                 UserController.delete)

    // end of api router

    router.use('/api', api.routes(), api.allowedMethods());

    app.use(router.routes());
    app.use(router.allowedMethods());

    logger.info('[API-SERVER] Router was configured')
  }
}

export default routerConfig;
