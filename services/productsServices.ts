import db from "../models";

type ProductRequest = {
  id: string;
  name: string;
  price: number;
};

class ProductsService {
  async index(data: Object): Promise<Object | Error> {
    try {
      const id = data;

      if (id) return await db.Products.findByPk(id);

      return await db.Products.findAll({});
    } catch (err) {
      throw err;
    }
  }

  async store(data: ProductRequest): Promise<Object | Error> {
    try {
      return await db.Products.create(data);
    } catch (err) {
      throw err;
    }
  }

  async update(data: ProductRequest, params: string): Promise<Object | Error> {
    try {
      return await db.Products.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: string): Promise<Object | Error> {
    try {
      return await db.Products.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new ProductsService();
