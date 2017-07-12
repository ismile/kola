import winston from 'winston';
import constant from './constant';
import config from '../../knexfile';

export default class LoggerConfig {

	static init() {
		if(constant.env == 'development') {
			winston.level = config.logger.dev;
		} else {
			winston.level = config.logger.prod;
		}
		winston.remove(winston.transports.Console);
		winston.add(winston.transports.Console, {
			colorize: true,
			level: winston.level
		})
	}
}
