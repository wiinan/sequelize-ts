import db from "../models";
import redisUtils from "../redisConfig";

type ProductReqRequest = {
  id: number;
  product_id: number;
  request_id: number;
  user_id: number;
  total_price: number;
  status: string;
};

class ProductRequestService {
  async index(data: Object): Promise<ProductReqRequest | Error> {
    try {
      const id = data;

      if (id) return await db.Products_requests.findByPk(id);

      const redisProductsRequestes = await redisUtils.getRedis(
        "product_requester"
      );

      if (!redisProductsRequestes) {
        const productsRequesters = await db.Products_requests.findByPk(id);
        await redisUtils.setRedis(
          "product_requester",
          JSON.stringify(productsRequesters)
        );
        return productsRequesters;
      }

      return JSON.parse(redisProductsRequestes);
    } catch (err) {
      throw err;
    }
  }

  async store(data: ProductReqRequest): Promise<ProductReqRequest | Error> {
    try {
      await db.Products_requests.create(data);

      await redisUtils.deleteRedis("product_requester");
      await redisUtils.deleteRedis("carts");

      return await db.carts.delete({ where: { user_id: data.user_id } });
    } catch (err) {
      throw err;
    }
  }

  async update(
    data: ProductReqRequest,
    params: number
  ): Promise<Object | Error> {
    try {
      await redisUtils.deleteRedis("product_requester");
      return await db.Products_requests.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: number): Promise<Object | Error> {
    try {
      await redisUtils.deleteRedis("product_requester");
      return await db.Products_requests.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new ProductRequestService();
