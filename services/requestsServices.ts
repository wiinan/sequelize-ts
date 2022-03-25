import db from "../models";
import redisUtils from "../redisConfig";

type RequestRequest = {
  id: number;
  provider_id: number;
  price: number;
};

class RequestsService {
  async index(data: Object): Promise<RequestRequest | Error> {
    try {
      const id = data;

      if (id) return await db.Requests.findByPk(id);

      const redisRequests = await redisUtils.getRedis("requests");

      if (!redisRequests) {
        const requests = await db.Requests.findAll({
          include: [{ model: db.Providers }],
        });
        await redisUtils.setRedis("requests", JSON.stringify(requests));
        return requests;
      }

      return JSON.parse(redisRequests);
    } catch (err) {
      throw err;
    }
  }

  async store(data: RequestRequest): Promise<RequestRequest | Error> {
    try {
      await redisUtils.deleteRedis("requests");
      return await db.Requests.create(data);
    } catch (err) {
      throw err;
    }
  }

  async update(data: RequestRequest, params: number): Promise<Object | Error> {
    try {
      await redisUtils.deleteRedis("requests");

      return await db.Requests.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: number): Promise<Object | Error> {
    try {
      await redisUtils.deleteRedis("requests");

      return await db.Requests.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new RequestsService();
