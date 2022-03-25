import db from "../models";
import redisUtils from "../redisConfig";

type ProviderRequest = {
  id: number;
  name: string;
  email: string;
  cep: number;
  street: string;
  city: string;
  country: string;
  number: number;
  price: number;
};

class ProvidersService {
  async index(data: Object): Promise<ProviderRequest | Error> {
    try {
      const id = data;

      if (id) return await db.Providers.findByPk(id);

      const redisProviders = await redisUtils.getRedis("providers");

      if (!redisProviders) {
        const providers = await db.Providers.findAll({});
        await redisUtils.setRedis("providers", JSON.stringify(providers));
        return providers;
      }

      return JSON.parse(redisProviders);
    } catch (err) {
      throw err;
    }
  }

  async store(data: ProviderRequest): Promise<ProviderRequest | Error> {
    try {
      redisUtils.deleteRedis("providers");
      return await db.Providers.create(data);
    } catch (err) {
      throw err;
    }
  }

  async update(data: ProviderRequest, params: number): Promise<Object | Error> {
    try {
      redisUtils.deleteRedis("providers");

      return await db.Providers.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: number): Promise<Object | Error> {
    try {
      redisUtils.deleteRedis("providers");

      return await db.Providers.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new ProvidersService();
