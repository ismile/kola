import Router from 'koa-router';
import ApiController from '../util/api-controller';
import <%= className %> from '../model/<%= className %>';

export default class <%= className %>Controller extends ApiController {
	path = '<%= name %>';
	Model = <%= className %>;

}
