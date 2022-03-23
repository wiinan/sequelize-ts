import db from "../models";

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
  async index(data: Object): Promise<Object | Error> {
    try {
      const id = data;

      if (id) return await db.Providers.findByPk(id);

      return await db.Providers.findAll({});
    } catch (err) {
      throw err;
    }
  }

  async store(data: ProviderRequest): Promise<Object | Error> {
    try {
      return await db.Providers.create(data);
    } catch (err) {
      throw err;
    }
  }

  async update(data: ProviderRequest, params: number): Promise<Object | Error> {
    try {
      return await db.Providers.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: number): Promise<Object | Error> {
    try {
      return await db.Providers.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new ProvidersService();
