import db from "../models";
import redisUtils from "../redisConfig";

type CartRequest = {
  id: number;
  user_id: number;
  product_id: string;
  total_price: number;
};

class CartService {
  async index(filter: Object): Promise<CartRequest | Error> {
    try {
      const id = filter;

      if (id) return await db.Carts.findByPk(id);

      const redisCart = await redisUtils.getRedis("carts");

      if (!redisCart) {
        const carts = await db.Carts.findAll({});
        await redisUtils.setRedis("carts", JSON.stringify(carts));
        return carts;
      }

      return JSON.parse(redisCart);
    } catch (err) {
      throw err;
    }
  }

  async storeAndUpdate(
    data: CartRequest,
    filter: number
  ): Promise<CartRequest | Error> {
    try {
      const product = await db.Products.findByPk(filter, { raw: true });
      const cart = await db.Carts.findOne({
        where: { user_id: data.user_id },
        raw: true,
      });

      if (!cart) {
        await redisUtils.deleteRedis("carts");

        return await db.carts.create({
          user_id: data.user_id,
          product_id: filter,
          total_price: product.price,
        });
      }
      const value = product.price + cart.total_price;

      await redisUtils.deleteRedis("carts");

      return await db.Carts.update(
        { total_price: value },
        { where: { id: cart.id } }
      );
    } catch (err) {
      throw err;
    }
  }

  async delete(params: string): Promise<Object | Error> {
    try {
      await redisUtils.deleteRedis("carts");
      return await db.Carts.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new CartService();
