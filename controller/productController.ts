import { Request, Response } from "express";
import ProductsService from "../services/productsServices";

class productController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductsService.index(req.params.id);

      res.status(200).json({ data: product });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async store(req: any, res: Response): Promise<void> {
    try {
      const products = await ProductsService.store(req.data);

      res.status(200).json({ data: products });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async update(req: any, res: Response): Promise<void> {
    try {
      await ProductsService.update(req.data, req.filter.id);

      res.status(200).json({ data: req.filter.id });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }

  async delete(req: any, res: Response): Promise<void> {
    try {
      await ProductsService.delete(req.filter.id);

      res.status(200).json({ data: `Deletado: ${req.filter.id}` });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
}

export default new productController();
