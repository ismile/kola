import mount from 'koa-mount';

export default class StaticFileConfig {
	/**
	 * @static
	 * @param {Koa} app
	 * @memberof StaticFileConfig
	 */
	static init(app) {
		app.use(require('koa-static')('./public'));
	}
}
