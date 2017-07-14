import Koa from 'koa';
import Router from 'koa-router';
import jwt from './jwt';

export default class RouterConfig {
	/** @type {Router} */
	static router;
	/**
	 * @static
	 * @param {Koa} app
	 * @memberof RouterConfig
	 */
	static init(app) {
		const router = this.router = new Router()
		this.protect();

		// config router
		new (require('../rest/user.res').default)().init(router);
		// end config router //please don't remove this line

		app.use(router.routes());
		app.use(router.allowedMethods());
	}

	/**
	 * @param {Router} router
	 * @memberof RouterConfig
	 */
	static protect() {
		this.router.all(/^\/api(?:\/|$)/, jwt.auth);
	}
}


