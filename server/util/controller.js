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
		for (var key in this._routeList) {
			var obj = this._routeList[key];
			this.route[obj.method](obj.path, this[key].bind(this));
		}
	}

	build(rootRouter) {
		rootRouter.use(this.rootPath+'/'+this.path, this.route.routes(), this.route.allowedMethods());
	}
}
