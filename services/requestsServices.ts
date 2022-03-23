import db from "../models";

type RequestRequest = {
  id: number;
  provider_id: number;
  price: number;
};

class RequestsService {
  async index(data: Object): Promise<Object | Error> {
    try {
      const id = data;

      if (id) return await db.Requests.findByPk(id);

      return await db.Requests.findAll({
        include: [{ model: db.Providers }],
      });
    } catch (err) {
      throw err;
    }
  }

  async store(data: RequestRequest): Promise<Object | Error> {
    try {
      return await db.Requests.create(data);
    } catch (err) {
      throw err;
    }
  }

  async update(data: RequestRequest, params: number): Promise<Object | Error> {
    try {
      return await db.Requests.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: number): Promise<Object | Error> {
    try {
      return await db.Requests.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new RequestsService();
