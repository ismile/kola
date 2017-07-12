export default class RouteUtil {
	static route(method, path) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};

			if(!method) method = 'get';
			if(!path) path = '/';

			target._routeList[key] = {
				path: path,
				method: method
			}
		}
	}

	static get(path) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!path) path = '/';

			target._routeList[key] = {
				path: path,
				method: 'get'
			}
		}
	}

	static post(path) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!path) path = '/';

			target._routeList[key] = {
				path: path,
				method: 'post'
			}
		}
	}

	static put(path) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!path) path = '/';

			target._routeList[key] = {
				path: path,
				method: 'put'
			}
		}
	}

	static del(path) {
		return function (target, key, obj) {
			if(!target._routeList) target._routeList = {};
			if(!path) path = '/';

			target._routeList[key] = {
				path: path,
				method: 'delete'
			}
		}
	}
}
