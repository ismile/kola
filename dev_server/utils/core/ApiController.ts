import Controller from "./Controller";
import {Context} from 'koa';
import MongoService from './MongoService'

export default class ApiController extends Controller {

  service = new MongoService()

  async findAll(ctx:Context, next:Promise<any>) {
    try {
      let query = ctx.request.query?ctx.request.query:{}
      ctx.body = await this.service.findAll(query)
    } catch (e) {
      this.log.error(e.stack)
      ctx.throw(this.status.BAD_REQUEST, e);
    }
  }

  async findOne(ctx:Context, next:Promise<any>) {
    try {
      let res = await this.service.findOne(ctx.params.id)
      ctx.body = res;
    } catch (e) {
      this.log.error(e.stack)
      ctx.throw(this.status.BAD_REQUEST, e);
    }
  }

  async findPage(ctx:any, next:Promise<any>) {
    try {
      ctx.body = await this.service.findPage(ctx.request.body);
    } catch (e) {
      this.log.error(e.stack)
      ctx.throw(this.status.BAD_REQUEST, e);
    }
  }

  async create(ctx:any, next:Promise<any>) {
    try {
      ctx.body = await this.service.create(ctx.request.body)
    } catch (e) {
      this.log.error(e.stack)
      ctx.throw(this.status.BAD_REQUEST, e);
    }
  }

  async update(ctx:any, next:Promise<any>) {
    try {
      ctx.body = await this.service.update(ctx.request.body)
    } catch (e) {
      this.log.error(e.stack)
      ctx.throw(this.status.BAD_REQUEST, e);
    }
  }

  async delete(ctx:any, next:Promise<any>) {
    try {
      ctx.body = await this.service.delete(ctx.request.body)
    } catch (e) {
      this.log.error(e.stack)
      ctx.throw(this.status.BAD_REQUEST, e);
    }
  }
}
