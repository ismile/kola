import Router from 'koa-router';
import Controller from '../util/controller';

export default class <%= className %>Controller extends Controller {
	path = '<%= name %>';

	/**
	 * @name hai
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description POST /api/<%= name %>/hai
	 */
	@route.get('/hai')
	async find(ctx, next) {
		ctx.body = 'hai'
	}
}
