import { Router } from "express";
import productRequestController from "../controller/product_requestController";
import Validate from "../schemas/validate";
import ProductRequest from "../schemas/productRequest";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/order/:id?", productRequestController.index);
router.post(
  "/order/",
  Validate(ProductRequest.store),
  productRequestController.store
);
router.put(
  "/order/:id",
  Validate(ProductRequest.update),
  productRequestController.update
);
router.delete(
  "/order/:id",
  Validate(ProductRequest.delete),
  productRequestController.delete
);

export default router;
