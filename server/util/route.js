export default class RouteUtil {
	static route(method, path, ...middleware) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!target._routeList[target.constructor.name]) target._routeList[target.constructor.name] = {};

			if(!method) method = 'get';
			if(!path) path = '/';

			target._routeList[target.constructor.name][key] = {
				path: path,
				method: method,
				middleware
			}
		}
	}

	static get(path, ...middleware) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!target._routeList[target.constructor.name]) target._routeList[target.constructor.name] = {};
			if(!path) path = '/';

			target._routeList[target.constructor.name][key] = {
				path: path,
				method: 'get',
				middleware
			}
		}
	}

	static post(path, ...middleware) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!target._routeList[target.constructor.name]) target._routeList[target.constructor.name] = {};
			if(!path) path = '/';

			target._routeList[target.constructor.name][key] = {
				path: path,
				method: 'post',
				middleware
			}
		}
	}

	static put(path, ...middleware) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!target._routeList[target.constructor.name]) target._routeList[target.constructor.name] = {};
			if(!path) path = '/';

			target._routeList[target.constructor.name][key] = {
				path: path,
				method: 'put',
				middleware
			}
		}
	}

	static del(path,...middleware) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!target._routeList[target.constructor.name]) target._routeList[target.constructor.name] = {};
			if(!path) path = '/';

			target._routeList[target.constructor.name][key] = {
				path: path,
				method: 'delete',
				middleware
			}
		}
	}
}
