import db from "../models";

type UserRequest = {
  id: number;
  user_id: number;
  product_id: string;
  total_price: number;
};

class CartService {
  async index(filter: Object): Promise<Object | Error> {
    try {
      const id = filter;

      if (id) return await db.Carts.findByPk(id);

      return await db.Carts.findAll({});
    } catch (err) {
      throw err;
    }
  }

  async storeAndUpdate(
    data: UserRequest,
    filter: number
  ): Promise<Object | Error> {
    try {
      const product = await db.Products.findByPk(filter, { raw: true });
      const cart = await db.Carts.findOne({
        where: { user_id: data.user_id },
        raw: true,
      });

      if (!cart) {
        return await db.carts.create({
          user_id: data.user_id,
          product_id: filter,
          total_price: product.price,
        });
      }
      const value = product.price + cart.total_price;

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
      return await db.Carts.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new CartService();
