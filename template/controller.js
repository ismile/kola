import Router from 'koa-router';
import Controller from '../util/controller';
import <%= className %> from '../model/<%= className %>';

export default class <%= className %>Controller extends Controller {
	path = '<%= name %>';
	Model = <%= className %>;

}
