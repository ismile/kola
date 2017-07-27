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
		// separate apiRoute and make custom route execute first
		let apiRoute = {};
		for (var key in this._routeList) {
			var obj = this._routeList[key];
			if(key == 'find' || key == 'findOne' || key == 'page' || key == 'create' || key == 'update' || key == 'delete') {
				apiRoute[key] = this._routeList[key];
			} else {
				let customMiddleware = obj.middleware.map((e)=> e.bind(this))
				this.route[obj.method](obj.path, ...customMiddleware, this[key].bind(this));
			}
		}
		for (var key in apiRoute) {
			var obj = this._routeList[key];
			let customMiddleware = obj.middleware.map((e)=> e.bind(this))
			this.route[obj.method](obj.path, ...customMiddleware, this[key].bind(this));
		}
	}

	build(rootRouter) {
		rootRouter.use(this.rootPath+'/'+this.path, this.route.routes(), this.route.allowedMethods());
	}
}
