import Koa from 'koa';
import winston from 'winston';
import http from 'http';

export default class App {
	/**@type {Koa} */
	static koa;
	/**@type {http} */
	static server;

	static init() {
		const app = new Koa(); this.koa = app;

		// load config
		require('./config/constant').default.init();
		require('./config/logger').default.init()
		require('./config/db').default.init();
		require('./config/model').default.init();
		require('./config/jwt').default.init();
		require('./config/web').default.init(app);
		require('./config/static').default.init(app);
		require('./config/router').default.init(app);

		const server = this.http = http.Server(app.callback());
		require('./config/socket').default.init(app, server);

		server.listen(3000);
		winston.info('[APP]', process.env.NODE_ENV.toUpperCase()+' MODE')
		winston.info('[APP]', 'Now running on localhost:3000');
	}
}
