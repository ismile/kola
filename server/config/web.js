import winston from 'winston';
import adapt from 'koa-adapter';
import config from '../../knexfile';
import Koa from 'koa';

export default class WebConfig {
	/**
	 * @static
	 * @param {Koa} app
	 * @memberof WebConfig
	 */
	static init(app) {
		app.keys = [config.auth.secret];
		app.use(require('koa-response-time')());
		app.use(require('koa-logger-winston')(winston));
		app.use(require('koa-conditional-get')());
		app.use(require('koa-etag')());
		app.use(require('koa-morgan')('combined'));
		app.use(require('koa-compress')({
			flush: require('zlib').Z_SYNC_FLUSH
		}));
		app.use(adapt(require('koa-session')({
			maxAge: 24 * 60 * 60 * 1000 // One Day
		}, app)));
		app.use(require('koa-body')());
		app.use(require('kcors')());

	}
}
