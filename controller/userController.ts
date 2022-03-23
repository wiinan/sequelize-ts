import { Request, Response } from "express";
import UsersService from "../services/userService";

class UserController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const user = await UsersService.index(req.params.id);

      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async store(req: any, res: Response): Promise<void> {
    try {
      const users = await UsersService.store(req.data);

      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async login(req: any, res: Response): Promise<void> {
    try {
      const users = await UsersService.login(req.data);

      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async update(req: any, res: Response): Promise<void> {
    try {
      await UsersService.update(req.data, req.filter.id);

      res.status(200).json({ data: req.filter.id });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async delete(req: any, res: Response): Promise<void> {
    try {
      await UsersService.delete(req.filter.id);

      res.status(200).json({ data: `Deletado: ${req.filter.id}` });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
}

export default new UserController();
