import Koa from 'koa';
// @ts-ignore
import adapt from 'koa-adapter';
import logger from './logger';
// @ts-ignore
import config from '../application.config.js';

export const init = function (app:Koa) {
  if(app.env == 'development') require('source-map-support').install()

  app.keys = [config.auth.secret];

  app.use(require('koa-conditional-get')());
  app.use(require('koa-etag')());
  app.use(require('koa-compress')({
    flush: require('zlib').Z_SYNC_FLUSH
  }));
  app.use(adapt(require('koa-session')({
    maxAge: 24 * 60 * 60 * 1000  // One Day
  }, app)));
  app.use(require('koa-bodyparser')());
  app.use(require('kcors')());

  logger.info('[API-SERVER] Web was configured');
}

export default {
  init
};
