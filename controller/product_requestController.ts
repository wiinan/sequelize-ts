import { Request, Response } from "express";
import ProductRequestService from "../services/product_request";

class productRequestController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const response = await ProductRequestService.index(req.params.id);

      res.status(200).json({ data: response });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async store(req: any, res: Response): Promise<void> {
    try {
      const response = await ProductRequestService.store(req.data);

      res.status(200).json({ data: response });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async update(req: any, res: Response): Promise<void> {
    try {
      await ProductRequestService.update(req.data, req.filter.id);

      res.status(200).json({ data: req.filter.id });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async delete(req: any, res: Response): Promise<void> {
    try {
      await ProductRequestService.delete(req.filter.id);

      res.status(200).json({ data: `Deletado: ${req.filter.id}` });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
}

export default new productRequestController();
