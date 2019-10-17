import Koa from 'koa';
import * as logger from './configs/logger';
import * as web from './configs/web';
import jwt from './configs/jwt';
import router from './configs/router';
import db from './configs/db';


async function run() {
  const app:Koa     = new Koa()
  const host:string = process.env.HOST || '127.0.0.1'
  const port:number = parseInt(process.env.PORT) || 3001

  // configure
  jwt.init();
  logger.init(app);
  db.init(app);
  web.init(app);
  router.init(app);
  // end of configure

  app.listen(port, host)
  setTimeout(() => {
    logger.default.info('[APP] Server listening on ' + host + ':' + port)
  }, 1000);
}

run();
