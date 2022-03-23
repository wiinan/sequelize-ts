import { Response } from "express";
import cartService from "../services/cartService";

class UserController {
  async index(req: any, res: Response): Promise<void> {
    try {
      const user = await cartService.index(req.filter);

      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async store(req: any, res: Response): Promise<void> {
    try {
      const users = await cartService.storeAndUpdate(req.data, req.filter.id);

      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async delete(req: any, res: Response): Promise<void> {
    try {
      await cartService.delete(req.filter.id);

      res.status(200).json({ data: `Deletado: ${req.filter.id}` });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
}

export default new UserController();
