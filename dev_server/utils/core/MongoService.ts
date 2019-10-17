import Service from "./Service";

export default class MongoService extends Service {
  pageParam = {
    size: 15,
    no: 1
  }

  async findAll(query: any) {
    return await this.model.collection().find(query).toArray();
  }

  async findOne(id: string) {
    return await this.model.collection().findOne({
      _id: this.model.type.ObjectId(id)
    })
  }

  async findPage(param: any) {
    let r       = this._buildPagination(param)
    let data    = await this.model.collection().find(param, r.options).toArray();
    let total   = await this.model.collection().countDocuments();

    return {
      data,
      size: data.length,
      total,
      isFirst: r.page.no == 1,
      isLast : Math.ceil(total / data.length) == r.page.no
    }
  }

  async create(data:any) {
    data = await this.model.transform(data)
    let res = await this.model.collection().insertOne(data, {
      serializeFunctions: true
    });
    return res.ops[0]
  }

  async update(data:any) {
    data          = await this.model.transform(data);
    let res       = await this.model.collection().findOneAndUpdate({
      _id: data._id
    }, {
      $set: data
    }, {
      returnOriginal: false
    });

    return res.value
  }

  async delete(data:any) {
    data          = await this.model.transform(data);
    let res       = await this.model.collection().deleteOne({
      _id: data._id
    });

    return res.result
  }

  _buildPagination(param:any) {
    let options = {};
    if (param.options) {
      options = param.options;
      delete param.options;
    }

    // build page param
    let page = this.pageParam;
    if (param.page) {
      page = {
        ...this.pageParam,
        ...param.page
      }
      delete param.page;
    }

    let pageParam = {
      skip: (page.no - 1) * page.size,
      limit: page.size
    }

    options = {
      limit: 0,
      skip: 0,
      ...pageParam,
      ...options
    }

    return {options, page}
  }


}
