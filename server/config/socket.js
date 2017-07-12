import winston from 'winston';

export default class SocketConfig {

	static init(app, server) {
		const io = require('socket.io').listen(server);
		app.io = io;
		io.on('connection', function (socket) {
			winston.info('[SOCKET]', 'Socket io now running');
		})
	}
}
