import Router from 'koa-router';
import {ModelClass} from 'objection';

import httpStatus from 'http-status-codes';
import winston from 'winston';

export default class Controller {
	/** @type {String} */
	path;
	rootPath = '/api';

	status = httpStatus
	logger = winston

	/** @type {Router} */
	route;

	// initial
	init(rootRouter) {
		this.initRoute();
		this.build(rootRouter);
	}

	initRoute() {
		this.route = new Router();
		// separate apiRoute and custom route
		for (var key in this._routeList[this.constructor.name]) {
			var obj = this._routeList[this.constructor.name][key];
			let customMiddleware = obj.middleware.map((e)=> e.bind(this))
			this.route[obj.method](obj.path, ...customMiddleware, this[key].bind(this));
		}
		if(this._routeList['ApiController']) {
			for (var key in this._routeList['ApiController']) {
				var obj = this._routeList['ApiController'][key];
				let customMiddleware = obj.middleware.map((e)=> e.bind(this))
				this.route[obj.method](obj.path, ...customMiddleware, this[key].bind(this));
			}
		}
		// clean it
		delete this._routeList[this.constructor.name]
	}

	build(rootRouter) {
		rootRouter.use(this.rootPath+'/'+this.path, this.route.routes(), this.route.allowedMethods());
	}
}
