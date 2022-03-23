import db from "../models";

type ProductReqRequest = {
  id: string;
  product_id: number;
  request_id: number;
  user_id: number;
  total_price: number;
  status: string;
};

class ProductRequestService {
  async index(data: Object): Promise<Object | Error> {
    try {
      const id = data;

      if (id) return await db.Products_requests.findByPk(id);

      return await db.Products_requests.findAll({});
    } catch (err) {
      throw err;
    }
  }

  async store(data: ProductReqRequest): Promise<Object | Error> {
    try {
      await db.Products_requests.create(data);

      return await db.carts.delete({ where: { user_id: data.user_id } });
    } catch (err) {
      throw err;
    }
  }

  async update(
    data: ProductReqRequest,
    params: string
  ): Promise<Object | Error> {
    try {
      return await db.Products_requests.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: string): Promise<Object | Error> {
    try {
      return await db.Products_requests.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new ProductRequestService();
