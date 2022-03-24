import db from "../models";
import redisUtils from "../redisConfig";
import products from "../schemas/products";

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

      const redisProducts = await redisUtils.getRedis("products");

      if (!redisProducts) {
        const products = await db.Products.findAll({});
        await redisUtils.setRedis("products", JSON.stringify(products));
        return products;
      }

      return JSON.parse(redisProducts);
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
