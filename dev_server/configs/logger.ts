import Koa from 'koa';
import {createLogger, format, transports} from 'winston';
// @ts-ignore
import config from './config';

const logger = createLogger();

export const init = async function (app:Koa) {

  switch (app.env) {
    case 'development':
      logger.add(new transports.Console({
        level : logger.level,
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.cli()
        )
      }))
      break;
    case 'production':
      logger.add(new transports.Console({
        level : logger.level,
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.cli()
        )
      }))
      break;

    default:
      break;
  }

  logger.info(`Starting ${config.name} ${config.version} in ${app.env} mode.`)
  logger.info('[APP] logger was configured');
}

export default logger;
