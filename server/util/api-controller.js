import Router from 'koa-router';
import Controller from './controller';
import {ModelClass} from 'objection';
import route from '../util/route';

export default class ApiController extends Controller {

	pageSize = 15;
	orderBy = 'id';
	direction = 'DESC';

	/** @type {ModelClass} */
	Model;

	/**
	 * @name Find Model
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description POST /api/${this.path}
	 */
	@route.get()
	async find(ctx, next) {
		try {
			ctx.body = await this.Model.query().where(ctx.request.query).orderBy('id', 'DESC');
		} catch(e) {
			ctx.throw(this.status.BAD_REQUEST, e);
		}
	}

	/**
	 * @name Find Model
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description GET /api/${this.path}
	 */
	@route.get('/:id')
	async findOne(ctx, next) {
		try {
			ctx.body = await this.Model.query().findOne({id: ctx.params.id})
		} catch(e) {
			ctx.throw(this.status.BAD_REQUEST, e);
		}
	}

	/**
	 * @name Paging Model
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description POST /api/${this.path}/page
	 */
	@route.post('/page')
	async page(ctx, next) {
		try {
			let param = ctx.request.body;
			var pageNo = 0;
			var pageSize = this.pageSize;
			if(param.page) {
				if(param.page.no) pageNo = param.page.no-1;
				if(param.page.size) pageSize = param.page.size
				delete param.page;
			}
			var orderBy = this.orderBy;
			var direction = this.direction;
			if(param.order) {
				if(param.order.by) orderBy = param.order.by;
				if(param.order.direction) direction = param.order.direction;
				delete param.order;
			}
			if(param.pageNo) {
				pageNo = param.pageNo-1;
				delete param.pageNo;
			}
			if(param.pageSize) {
				pageSize = param.pageSize;
				delete param.pageSize;
			}
			if(param.orderBy) {
				orderBy = param.orderBy;
				delete param.orderBy;
			}
			if(param.orderDirection) {
				direction = param.orderDirection;
				delete param.orderDirection;
			}

			let res = await this.Model
				.query()
				.where(param)
				.page(pageNo, pageSize)
				.orderBy(orderBy, direction);

			res.isFirst = false;
			res.isLast = false;
			res.pageSize = Math.ceil(res.total/res.results.length);
			if(res.pageSize-1 == pageNo) res.isLast = true;
			if(pageNo == 0) res.isFirst = true;

			ctx.body = res;

		} catch(e) {
			ctx.throw(this.status.BAD_REQUEST, e);
		}
	}


	/**
	 * @name Create Model
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description POST /api/${this.path}
	 */
	@route.post()
	async create(ctx, next) {
		try {
			let data = ctx.request.body;
			ctx.body = await this.Model.query().insert(data);
		} catch(e) {
			ctx.throw(this.status.BAD_REQUEST, e);
		}
	}

	/**
	 * @name Update Model
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description PUT /api/${this.path}
	 */

	@route.put()
	async update(ctx, next) {
		try {
			let data = ctx.request.body;
			ctx.body = await this.Model.query().patchAndFetchById(data.id, data);
		} catch(e) {
			ctx.throw(this.status.BAD_REQUEST, e);
		}
	}

	/**
	 * @name Delete Model
	 * @param {Router.IRouterContext} ctx
	 * @param {Promise<>} next
	 * @description DELETE /api/${this.path}
	 */
	@route.del('/:id')
	async delete(ctx, next) {
		try {
			let data = ctx.request.body;
			ctx.body = await this.Model.query().deleteById(ctx.params.id);
		} catch(e) {
			ctx.throw(this.status.BAD_REQUEST, e);
		}
	}
}
