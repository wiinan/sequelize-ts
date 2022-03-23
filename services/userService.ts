import db from "../models";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import redisUtils from "../redisConfig";

type UserRequest = {
  id: number;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

class UserService {
  async index(data: Object): Promise<Object | Error> {
    try {
      const id = data;

      const redisUsers = await redisUtils.getRedis("users");

      if (id) return await db.Users.findByPk(id);

      if (!redisUsers) {
        const users = await db.Users.findAll({});
        await redisUtils.setRedis("users", JSON.stringify(users));
        return users;
      }

      return JSON.parse(redisUsers);
    } catch (err) {
      throw err;
    }
  }

  async store(data: UserRequest): Promise<Object | Error> {
    try {
      const user = await db.Users.findOne({ where: { email: data.email } });

      if (user) throw Error("Este email ja existe!");

      return await db.Users.create(data);
    } catch (err) {
      throw err;
    }
  }

  async login(data: UserRequest): Promise<Object | Error> {
    try {
      const user = await db.Users.findOne({
        where: { email: data.email },
        raw: true,
      });

      if (!user) throw Error("Usuario nao encontrado!");

      const isValid = bcryptjs.compareSync(data.password, user.password);

      if (!isValid) throw Error("Senha Invalida!");

      const userLogged = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      return { userLogged, user };
    } catch (err) {
      throw err;
    }
  }

  async update(data: UserRequest, params: number): Promise<Object | Error> {
    try {
      return await db.Users.update(data, { where: { id: params } });
    } catch (err) {
      throw err;
    }
  }

  async delete(params: number): Promise<Object | Error> {
    try {
      return await db.Users.delete({ where: { id: params } });
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
