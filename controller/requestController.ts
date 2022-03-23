import { Request, Response } from "express";
import RequestsService from "../services/requestsServices";

class requestController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const request = await RequestsService.index(req.params.id);

      res.status(200).json({ data: request });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async store(req: any, res: Response): Promise<void> {
    try {
      const request = await RequestsService.store(req.data);

      res.status(200).json({ data: request });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async update(req: any, res: Response): Promise<void> {
    try {
      await RequestsService.update(req.data, req.filter.id);

      res.status(200).json({ data: req.filter.id });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async delete(req: any, res: Response): Promise<void> {
    try {
      await RequestsService.delete(req.filter.id);

      res.status(200).json({ data: `Deletado: ${req.filter.id}` });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
}

export default new requestController();
