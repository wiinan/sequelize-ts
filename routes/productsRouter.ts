import { Router } from "express";
import productController from "../controller/productController";
import Validate from "../schemas/validate";
import Product from "../schemas/products";

const router = Router();

router.get("/products/:id?", productController.index);
router.post("/products/", Validate(Product.store), productController.store);
router.put("/products/:id", Validate(Product.update), productController.update);
router.delete("/products/:id", Validate(Product.delete), productController.delete);

export default router;
