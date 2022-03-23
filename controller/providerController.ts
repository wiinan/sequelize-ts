import { Request, Response } from "express";
import ProvidersService from "../services/providerServices";

class providerController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const provider = await ProvidersService.index(req.params.id);

      res.status(200).json({ data: provider });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async store(req: any, res: Response): Promise<void> {
    try {
      const providers = await ProvidersService.store(req.data);

      res.status(200).json({ data: providers });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async update(req: any, res: Response): Promise<void> {
    try {
      await ProvidersService.update(req.data, req.filter.id);

      res.status(200).json({ data: req.filter.id });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async delete(req: any, res: Response): Promise<void> {
    try {
      await ProvidersService.delete(req.filter.id);

      res.status(200).json({ data: `Deletado: ${req.filter.id}` });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
}

export default new providerController();
