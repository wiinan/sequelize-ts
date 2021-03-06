import { Router } from "express";
import providerController from "../controller/providerController";
import Validate from "../schemas/validate";
import Provider from "../schemas/providers";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/providers/:id?", providerController.index);
router.post("/providers/", Validate(Provider.store), providerController.store);
router.put(
  "/providers/:id",
  Validate(Provider.update),
  providerController.update
);
router.delete(
  "/providers/:id",
  Validate(Provider.delete),
  providerController.delete
);

export default router;
