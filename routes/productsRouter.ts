import { Router } from "express";
import productController from "../controller/productController";
import Validate from "../schemas/validate";
import Product from "../schemas/products";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/products/:id?", productController.index);
router.post("/products/", Validate(Product.store), productController.store);
router.put("/products/:id", Validate(Product.update), productController.update);
router.delete(
  "/products/:id",
  Validate(Product.delete),
  productController.delete
);

export default router;
