import Router from 'koa-router';
import _ from 'lodash';

import ApiController from '../util/api-controller';
import route from '../util/route';
import User from '../model/User';
import jwt from '../config/jwt';

export default class UserController extends ApiController {
	path = 'user';
	Model = User;

	/**
	 * @name Create User (Overide)
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description POST /api/user
	 */
	@route.post()
	async create(ctx, next) {
		let param = ctx.request.body;
		if(_.isEmpty(param.username) || _.isEmpty(param.password)) {
			ctx.throw(this.status.BAD_REQUEST, 'Username or password is empty');
		} else {
			let countUser = await User.query().count('username').where('username', param.username).first();
			if(_.parseInt(countUser.count) > 0) ctx.throw(this.status.BAD_REQUEST, `Username ${param.username} already exist`);

			let user = await User.query().insert(param);
			ctx.body = user;
		}
	}

	/**
	 * @name Update User (overide)
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description PUT /api/user
	 */
	@route.put()
	async update(ctx, next) {
		try {
			let param = ctx.request.body;
			// dont update password
			delete param.password;
			ctx.body = await User.query().patchAndFetchById(param.id, param);
		} catch(e) {
			ctx.throw(this.status.BAD_REQUEST, e);
		}
	}

	/**
	 * @name Login
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description
	 */
	async login(ctx, next) {
		let param = ctx.request.body;
		if(_.isEmpty(param.username) || _.isEmpty(param.password)) {
			ctx.throw(this.status.BAD_REQUEST)
		} else {
			let user = await User.query().where('username', param.username).limit(1).first();
			if(_.isEmpty(user)) ctx.throw(this.status.BAD_REQUEST, `Username ${param.username} cannot be found`);
			let isPass = await user.checkPassword(param.password);
			if(!isPass) ctx.throw(this.status.BAD_REQUEST, `Username and password doesn't match`);

			ctx.body = await jwt.generateTokens(user);
		}
	}


	// overide build router
	build(rootRouter) {
		rootRouter.post('/auth', this.login.bind(this));
		rootRouter.use(this.rootPath+'/user', this.route.routes(), this.route.allowedMethods());
	}
}
