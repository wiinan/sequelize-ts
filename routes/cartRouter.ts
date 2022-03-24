import { Router } from "express";
import cartController from "../controller/cartController";
import Validate from "../schemas/validate";
import Cart from "../schemas/cart";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/cart/:id?", cartController.index);
router.post("/cart/:id", Validate(Cart.store), cartController.store);
router.delete("/cart/:id", Validate(Cart.delete), cartController.delete);

export default router;
