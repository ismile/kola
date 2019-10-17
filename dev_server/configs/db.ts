import Koa from 'koa';
import {
  MongoClient,
  Db,
  Mongos,
  DBRef,
  ObjectID,
  MongoCallback
} from 'mongodb';
// @ts-ignore
import config from '../application.config';
import constant from '../utils/constant';
import logger from './logger';


interface DBConfig {
  retry : number;
  db    : Db;
  client: MongoClient;
  init(app:Koa):void;
  connect(app:Koa):void;
}

var dbConfig:DBConfig = {
  retry : 0,
  db    : null,
  client: null,

  async init(app:Koa) {
    await this.connect(app);
  },

  async connect(app:Koa) {
    logger.info('[DB] Connecting to database');
    try {
      let client = this.client = await MongoClient.connect(config[constant.env].db.url, config[constant.env].db.options);
      let db:Db = this.db = this.client.db(config[constant.env].db.name);
      logger.info('[DB] Connected');
      this.retry = 0;
      //handle disconnect
      this.db.on('close', async() => {
        logger.warn('disconected');
        logger.info('[DB] Reconnecting in 3 second');
        setTimeout(async() => await this.connect(app), 3000);
      });
    } catch (e) {
      logger.error('[DB] '+e);
      this.retry++;
      logger.info(`[DB] retry ${this.retry} in 3 second`);
      setTimeout(async() => await this.connect(app), 3000);
    }
  }
}

export default dbConfig;
